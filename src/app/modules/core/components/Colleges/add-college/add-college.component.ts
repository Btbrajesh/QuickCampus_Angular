import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, CityInfo } from 'src/app/modules/master/models/city';
import { Country, CountryInfo } from 'src/app/modules/master/models/country';
import { State, StateInfo } from 'src/app/modules/master/models/state';
import { CountrystatecityService } from 'src/app/modules/shared/services/countrystatecity.service';
import { AddCollegeService } from '../../../services/add-college.service';
import { College } from 'src/app/modules/master/models/college';

@Component({
  selector: 'app-add-college',
  templateUrl: './add-college.component.html',
  styleUrls: ['./add-college.component.css']
})
export class AddCollegeComponent implements OnInit{
   addCollegeForm!: FormGroup;

    data!:College
    listcountry!: Country
    countryInfoList!: CountryInfo[]
    listState!: State
    stateInfoList!: StateInfo[]
    listCity!: City
    cityInfoList!:CityInfo[]
    selectedFile: File | null = null;
    selectedFileName!: string;
    imagePreviewUrl: string | ArrayBuffer | null = null;

   constructor(public fb:FormBuilder,private countrystatecityService: CountrystatecityService, public addCollegeService:AddCollegeService){}

   ngOnInit(): void {
    this.fetchCountry();
     this.addCollegeForm = this.fb.group({
      ImagePath:['',[Validators.required]],
      collegeName:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
      collegeCode:['',[Validators.required]],
      Address1:['',[Validators.required]],
      CityId:['',[Validators.required]],
      StateId:['',[Validators.required]],
      CountryId:['',[Validators.required]],
      ContectPerson:['',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      ContectEmail:['',[Validators.required,Validators.email]],
      ContectPhone:['',[Validators.required,Validators.maxLength(10)]],

     })
   }

   submit(){

    if (this.addCollegeForm.valid){
      this.data = this.addCollegeForm.value
      this.data.ImagePath = this.selectedFileName
      this.data.isActive = true
      this.addCollegeService.addCollege(this.data).subscribe((res)=>{
        console.log(res,'res')
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
          this.imagePreviewUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(this.selectedFile);
  } else {
      this.imagePreviewUrl = null; // Reset image preview if no file is selected
  }
}
}
