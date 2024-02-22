import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountrystatecityService } from 'src/app/modules/shared/services/countrystatecity.service';
import { AddCollegeService } from '../../services/add-college.service';
import { City, CityInfo } from 'src/app/modules/master/models/city';
import { Country, CountryInfo } from 'src/app/modules/master/models/country';
import { State, StateInfo } from 'src/app/modules/master/models/state';
import { Campus } from 'src/app/modules/master/models/campus';
import { AddCampusService } from '../../services/add-campus.service';

@Component({
  selector: 'app-add-campus',
  templateUrl: './add-campus.component.html',
  styleUrls: ['./add-campus.component.css']
})
export class AddCampusComponent implements OnInit{

    data!:Campus
    addCampusForm!:FormGroup
    listcountry!: Country
    countryInfoList!: CountryInfo[]
    listState!: State
    stateInfoList!: StateInfo[]
    listCity!: City
    cityInfoList!:CityInfo[]

  constructor(public fb:FormBuilder,private countrystatecityService: CountrystatecityService,public addCampusService:AddCampusService){}

  ngOnInit(): void {
    this.fetchCountry()
    this.addCampusForm = this.fb.group({
      campusDate:[],
      title:[],
      address1:[],
      address2:[],
      country:[],
      state:[],
      city:[],
      isActive:[],
      jobDescription:[]
    })
  }

  submit(){
    console.log(this.addCampusForm.value)
    if (this.addCampusForm.valid){
      this.data = this.addCampusForm.value
      this.addCampusService.addCampus(this.data).subscribe((res)=>{
        console.log(res,'campus')
      })
    }
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
