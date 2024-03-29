import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { State } from 'src/app/modules/master/models/state';
import { ToastrService } from 'ngx-toastr';
import { CampusService } from 'src/app/modules/core/services/campus.service';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { CollegeService } from 'src/app/modules/core/services/college.service';
import { UpdateCampus } from 'src/app/modules/master/models/campus';
import { City, CityInfo } from 'src/app/modules/master/models/city';
import { Country, CountryInfo } from 'src/app/modules/master/models/country';
import { StateInfo } from 'src/app/modules/master/models/state';
import { CountrystatecityService } from 'src/app/modules/shared/services/countrystatecity.service';

@Component({
  selector: 'app-edit-campus',
  templateUrl: './edit-campus.component.html',
  styleUrls: ['./edit-campus.component.css']
})
export class EditCampusComponent implements OnInit{


    collegeList :any[]=[];
    clientList:any
    data!:UpdateCampus
    editCampusForm!:FormGroup
    listcountry!: Country
    countryInfoList!: CountryInfo[]
    listState!: State
    stateInfoList!: StateInfo[]
    listCity!: City
    cityInfoList!:CityInfo[]
    selectedColleges: any[] = [];
    isDisabled: boolean = true;

  constructor(public route:ActivatedRoute,public clientService:ClientService,public router:Router,public toastr:ToastrService,private spinnerService: NgxSpinnerService,private collegeService:CollegeService,public fb:FormBuilder,private countrystatecityService: CountrystatecityService,public campusService:CampusService){}

  ngOnInit(): void {
    this.initForm()
    this.fetchCountry()
    this.getAllCollegeList()
    this.loadCampusData()
  }

  initForm() {
    this.editCampusForm = this.fb.group({
      walkInID: new FormControl(),
      walkInDate:new FormControl(),
      title:new FormControl(),
      address1:new FormControl(),
      address2:new FormControl(),
      countryId:new FormControl(),
      stateId:new FormControl(),
      city:new FormControl(),
      jobDescription:new FormControl(),
      selectedCollegeId: new FormControl(),
      colleges :this.fb.array([])
    });
  }

  loadCampusData() {
    const questionId = this.route.snapshot.params['id'];
    this.campusService.getCampusById(questionId).subscribe((campusData: any) => {
      this.onCountrySelected(campusData.countryID)
      this.onStateSelected(campusData.stateID)
      console.log(campusData)
      this.editCampusForm.patchValue(campusData);
      this.patchOptionsArray(campusData.colleges);
    });
  }

  patchOptionsArray(options: any[]) {
    if (options) {
      const optionsFormArray = this.editCampusForm.get('colleges') as FormArray;
      options.forEach(option => {
        optionsFormArray.push(this.fb.group(option));
      });
    }
  }

  get collegeArray(): FormArray {
    return this.editCampusForm.get('colleges') as FormArray;
  }

  addCollegeData(){
    const selectedCollegeId = this.editCampusForm.value.selectedCollegeId;
    this.collegeService.getCollegeById(selectedCollegeId).subscribe((res)=>{
      this.patchCollegeArray(res.data);
    })
  }

  patchCollegeArray(college:any){
    const collegeFormArray = this.editCampusForm.get('colleges') as FormArray;
    collegeFormArray.push(this.createCollegeFormGroup(college));
    
  }
  addCollegeFormGroup(college: any) {
    const collegeFormArray = this.editCampusForm.get('colleges') as FormArray;
    collegeFormArray.push(this.createCollegeFormGroup(college));
    
  }

  createCollegeFormGroup(college: any): FormGroup {
    return this.fb.group({
      stateId:[college.stateId],
      collegeId:[college.collegeId],
      collegeName: [college.collegeName],
      collegeCode: [college.collegeCode],
      examStartTime: [''],
      examEndTime: [''],
      startDateTime: ['']
    });
  }

  removeCollege(index: number) {
    const collegeFormArray = this.editCampusForm.get('colleges') as FormArray;
    collegeFormArray.removeAt(index);
    this.selectedColleges.splice(index, 1);
  }

  getClientList(){
    this.clientService.getClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
      }
    },err=>{
      this.toastr.error(err)
    })
  }

  getAllCollegeList(){
    this.spinnerService.show();
    this.collegeService.getCollegeList().subscribe(res =>{
      if(res.isSuccess){
        this.spinnerService.hide();
        this.collegeList = res.data;
      }
    },err =>{
      this.spinnerService.hide();
      this.toastr.error(err)
    })
  }


  fetchCountry(){
    this.countrystatecityService.getCountry().subscribe(data=>{
      this.listcountry = data
      this.countryInfoList = this.listcountry.data
    },err=>{
      this.toastr.error(err)
    })
  }
  
  onCountrySelected(countryId: any){
    this.countrystatecityService.getStateOfSelectedCountry(countryId).subscribe(data=>{
      this.listState = data
      this.stateInfoList = this.listState.data
    },err=>{
      this.toastr.error(err)
    })
  }
  
  onStateSelected(stateId:number){
    this.countrystatecityService.getCitiesOfSelectedState(stateId).subscribe(data=>{
    this.listCity = data
    this.cityInfoList = this.listCity.data
  },err=>{
      this.toastr.error(err)
    })
}

 cancel(){
  this.router.navigateByUrl('/admin/campus')
 }

 submit(){
  if (this.editCampusForm.valid){
    this.data = this.editCampusForm.value
    this.data.walkInId = this.route.snapshot.params['id']
    this.campusService.updateCampus(this.data).subscribe((res)=>{
      console.log(res)
    })
  }
 }

}
