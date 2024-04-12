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
    roleName:any

  constructor(public clientService:ClientService,public router:Router,public toastr:ToastrService,private spinnerService: NgxSpinnerService,private collegeService:CollegeService,public fb:FormBuilder,private countrystatecityService: CountrystatecityService,public campusService:CampusService){}

  ngOnInit(): void {
    this.fetchCountry()
    this.getAllCollegeList()
    this.initForm()
    this.roleName = localStorage.getItem('role')
    if (this.roleName == 'Admin'){
      this.getClient()
    }
  }

  initForm(){
    this.addCampusForm= this.fb.group({
      walkInDate:['',[Validators.required]],
      title:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      address1:['',[Validators.required,Validators.maxLength(30)]],
      address2:['',[Validators.maxLength(30)]],
      countryID:['',[Validators.required]],
      stateID:['',[Validators.required]],
      city:['',[Validators.required]],
      jobDescription:['',[Validators.required,,Validators.maxLength(1000)]],
      selectedCollegeId: [''],
      clientId:['',[Validators.required]],
      passingYear:['',[Validators.maxLength(4)]],
      walkInID:[0],
      colleges :this.fb.array([],[Validators.required]),
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

  getClient(){
    this.clientService.getAllClientList().subscribe((res)=>{
      if (res.isSuccess){
        this.clientList = res.data.filter((client:any) => client.isActive === true)
      }
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
      delete this.data.selectedCollegeId;
      
      this.data.countryID = parseInt(this.addCampusForm.value.countryID, 10);
      this.data.stateID = parseInt(this.addCampusForm.value.stateID, 10);
      this.data.city = parseInt(this.addCampusForm.value.city, 10);
      
      console.log(this.data)
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
      collegeId:[college.collegeId],
      collegeName: [college.collegeName],
      collegeCode: [college.collegeCode],
      examStartTime: [''],
      examEndTime: [''],
      startDateTime: [''],
      isIncludeInWalkIn:[true]
    });
  }

  removeCollege(index: number) {
    const collegeFormArray = this.addCampusForm.get('colleges') as FormArray;
    collegeFormArray.removeAt(index);
    this.selectedColleges.splice(index, 1);
  }

 
  getAllCollegeList(){
    this.spinnerService.show();
    const pageStart1=1
    const pageSize1 = 1000
    this.collegeService.getAllCollegeList(pageStart1,pageSize1).subscribe(res =>{
      if(res.isSuccess){
        this.spinnerService.hide();
        this.collegeList = res.data.filter((college:any)=> college.isActive === true);
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
