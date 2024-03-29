import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountrystatecityService } from 'src/app/modules/core/services/countrystatecity.service';
import { City, CityInfo } from 'src/app/modules/master/models/city';
import { Country, CountryInfo } from 'src/app/modules/master/models/country';
import { State, StateInfo } from 'src/app/modules/master/models/state';
import { Campus } from 'src/app/modules/master/models/campus';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollegeService } from '../../../../services/college.service';
import { CampusService } from '../../../../services/campus.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { valHooks } from 'jquery';

@Component({
  selector: 'app-add-campus',
  templateUrl: './add-campus.component.html',
  styleUrls: ['./add-campus.component.css']
})
export class AddCampusComponent implements OnInit{

    collegeList :any[]=[];
    clientList:any
    data!:Campus
    addCampusForm!:FormGroup
    listcountry!: Country
    countryInfoList!: CountryInfo[]
    listState!: State
    stateInfoList!: StateInfo[]
    listCity!: City
    cityInfoList!:CityInfo[]
    selectedColleges: any[] = [];
    isTableVisible: boolean = false;
    isDisabled: boolean = true;

  constructor(public clientService:ClientService,public router:Router,public toastr:ToastrService,private spinnerService: NgxSpinnerService,private collegeService:CollegeService,public fb:FormBuilder,private countrystatecityService: CountrystatecityService,public campusService:CampusService){}

  ngOnInit(): void {
    this.fetchCountry()
    this.getAllCollegeList()
    this.getClientList()
    this.initForm()
  }

  initForm(){
    this.addCampusForm= this.fb.group({
      walkInDate:['',[Validators.required]],
      title:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      address1:['',[Validators.required,Validators.maxLength(30)]],
      address2:['',[Validators.required,Validators.maxLength(30)]],
      countryId:['',[Validators.required]],
      stateId:['',[Validators.required]],
      city:['',[Validators.required]],
      jobDescription:['',[Validators.required,,Validators.maxLength(200)]],
      selectedCollegeId: ['',[Validators.required]],
      colleges :this.fb.array([],[Validators.required])
    })
  }

  get collegeArray(): FormArray {
    return this.addCampusForm.get('colleges') as FormArray;
  }

  addCollegeData(){
    const selectedCollegeId = this.addCampusForm.value.selectedCollegeId;
    this.collegeService.getCollegeById(selectedCollegeId).subscribe((res)=>{
      this.patchCollegeArray(res.data);
    })
  }

  patchCollegeArray(college:any){
    const collegeFormArray = this.addCampusForm.get('colleges') as FormArray;
    collegeFormArray.push(this.createCollegeFormGroup(college));
    this.isTableVisible = true
  }

  submit(){
    if (this.addCampusForm.valid){
      this.data = this.addCampusForm.value
      this.data.countryId = parseInt(this.addCampusForm.value.countryId, 10);
      this.data.stateId = parseInt(this.addCampusForm.value.stateId, 10);
      this.campusService.addCampus(this.data).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.addCampusForm.reset()
          this.router.navigateByUrl('/admin/campus')
        }else{
          this.toastr.error(res.message)
        }
      })
    }
  }

  

  addCollegeFormGroup(college: any) {
    const collegeFormArray = this.addCampusForm.get('colleges') as FormArray;
    collegeFormArray.push(this.createCollegeFormGroup(college));
    this.isTableVisible = true
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
    const collegeFormArray = this.addCampusForm.get('colleges') as FormArray;
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
}
