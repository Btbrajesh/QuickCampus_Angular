import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountrystatecityService } from 'src/app/modules/shared/services/countrystatecity.service';
import { City, CityInfo } from 'src/app/modules/master/models/city';
import { Country, CountryInfo } from 'src/app/modules/master/models/country';
import { State, StateInfo } from 'src/app/modules/master/models/state';
import { Campus } from 'src/app/modules/master/models/campus';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollegeService } from '../../../services/college.service';
import { CampusService } from '../../../services/campus.service';

@Component({
  selector: 'app-add-campus',
  templateUrl: './add-campus.component.html',
  styleUrls: ['./add-campus.component.css']
})
export class AddCampusComponent implements OnInit{

  collegeList :any[]=[];

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

  constructor(private spinnerService: NgxSpinnerService,private collegeService:CollegeService,public fb:FormBuilder,private countrystatecityService: CountrystatecityService,public campusService:CampusService){}

  ngOnInit(): void {
    this.fetchCountry()
    this.getAllCollegeList()
    this.addCampusForm= this.fb.group({
      campusDate:[''],
      title:[''],
      address1:[''],
      address2:[''],
      country:[''],
      state:[''],
      city:[''],
      isActive:[''],
      jobDescription:[''],
      selectedCollegeId: [''],
      collegeForm :this.fb.group({
        collegeName:[''],
        collegeCode:[''],
        examStartTime:[''],
        examEndTime:[''],
        startDate:['']
      })
    })
  }

  submit(){
    if (this.addCampusForm.valid){
      this.data = this.addCampusForm.value
      this.campusService.addCampus(this.data).subscribe((res)=>{
        console.log(res,'campus')
      })
    }
  }

  addCollege() {
    const selectedCollegeId = this.addCampusForm.value.selectedCollegeId;
    const selectedCollege = this.collegeList.find(college => college.collegeId == selectedCollegeId);
    if (selectedCollege && !this.selectedColleges.some(college => college.collegeId === selectedCollege.collegeId)) {
      this.selectedColleges.push(selectedCollege);
      this.isTableVisible = true;
  }
  }

  removeCollege(index: number) {
    this.selectedColleges.splice(index, 1);
    if (this.selectedColleges.length<=0){
      this.isTableVisible = false;
    }
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
      console.log("Error in applicant list",err);
    })
  }


  private fetchCountry(){
    this.countrystatecityService.getCountry().subscribe(data=>{
      this.listcountry = data
      this.countryInfoList = this.listcountry.data
    })
  }
  
  onCountrySelected(countryId: any){
    this.countrystatecityService.getStateOfSelectedCountry(countryId).subscribe(data=>{
      this.listState = data
      this.stateInfoList = this.listState.data
    })
  }
  
  onStateSelected(stateId:number){
    this.countrystatecityService.getCitiesOfSelectedState(stateId).subscribe(data=>{
    this.listCity = data
    this.cityInfoList = this.listCity.data
  })
}
}
