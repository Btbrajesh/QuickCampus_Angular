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
import { CountrystatecityService } from 'src/app/modules/core/services/countrystatecity.service';
import * as moment from 'moment';

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
    country:any;
    // walkInFormattedDate:any;

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
      countryID:new FormControl(),
      stateID:new FormControl(),
      city:new FormControl(),
      jobDescription:new FormControl(),
      selectedCollegeId: new FormControl(),
      colleges :this.fb.array([])
    });
  }

  loadCampusData() {
    const campusId = this.route.snapshot.params['id'];
    this.campusService.getCampusById(campusId).subscribe((campusData: any) => {
      console.log(campusData)
      campusData.data['walkInDate'] = moment(campusData.data['walkInDate']).format("yyyy-MM-DD")
      
      this.editCampusForm.patchValue(campusData.data);


      // this.walkInFormattedDate = moment(campusData.data['walkInDate']).format("yyyy-MM-DD");
      // this.editCampusForm.get('walkInDate')?.setValue(this.walkInFormattedDate)
      // console.log(this.walkInFormattedDate)
      
      this.patchOptionsArray(campusData.data.colleges);
    });
  }

  patchOptionsArray(options: any[]) {
    if (options) {
      const optionsFormArray = this.editCampusForm.get('colleges') as FormArray;
      options.forEach(option => {
        option['startDateTime'] = moment(option['startDateTime']).format("yyyy-MM-DD")
        option['examStartTime'] = moment('01-01-1970 ' + option['examStartTime']).format("hh:mm")
        option['examEndTime'] = moment('01-01-1970 ' + option['examEndTime']).format("hh:mm")
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
      collegeId:[college.collegeId],
      collegeName: [college.collegeName],
      collegeCode: [college.collegeCode],
      examStartTime: [college.examStartTime],
      examEndTime: [college.examEndTime],
      startDateTime: [college.startDateTime]
    });
  }

  removeCollege(index: number) {
    const collegeFormArray = this.editCampusForm.get('colleges') as FormArray;
    collegeFormArray.removeAt(index);
    this.selectedColleges.splice(index, 1);
  }

  getClientList(){
    this.clientService.getAllClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
      }
    },err=>{
      this.toastr.error(err)
    })
  }

  getAllCollegeList(){
    this.spinnerService.show();
    this.collegeService.getAllCollegeList().subscribe(res =>{
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
      if (res.isSuccess){
        this.toastr.success(res.message)
        this.router.navigateByUrl('/admin/campus')
      }else{
        this.toastr.error(res.message)
      }
    },err=>{
      this.toastr.error(err)
    })
  }else{
    this.toastr.error("Please fill the form properly")
  }
 }

}
