import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { City, CityInfo } from 'src/app/modules/master/models/city';
import { Country, CountryInfo } from 'src/app/modules/master/models/country';
import { State, StateInfo } from 'src/app/modules/master/models/state';
import { CountrystatecityService } from 'src/app/modules/shared/services/countrystatecity.service';
import { College, UpdateCollege } from 'src/app/modules/master/models/college';
import { CollegeService } from 'src/app/modules/core/services/college.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/modules/core/services/client.service';

@Component({
  selector: 'app-edit-college',
  templateUrl: './edit-college.component.html',
  styleUrls: ['./edit-college.component.css']
})
export class EditCollegeComponent implements OnInit{

    listcountry!: Country
    countryInfoList!: CountryInfo[]
    listState!: State
    stateInfoList!: StateInfo[]
    listCity!: City
    cityInfoList!:CityInfo[]
    selectedFile: File | null = null;
    selectedFileName!: string;
    clientList:any
    imagePreviewUrl: string | ArrayBuffer | null = null;
    editCollegeForm= new FormGroup({
      id: new FormControl(),
      ImagePath:new FormControl(''),
      collegeName:new FormControl(''),
      collegeCode:new FormControl(''),
      Address1:new FormControl(''),
      Address2:new FormControl(''),
      CityId:new FormControl(''),
      StateId:new FormControl(''),
      CountryId:new FormControl(''),
      ContectPerson:new FormControl(''),
      ContectEmail:new FormControl(''),
      ContectPhone:new FormControl(''),
      client:new FormControl(''),
      isActive:new FormControl()
    })

    constructor(public clientService:ClientService,private router:ActivatedRoute,public fb:FormBuilder,private countrystatecityService: CountrystatecityService, public collegeService:CollegeService){}


  ngOnInit(): void {
    this.fetchCountry();
    this.getClient()
    this.collegeService.getDetailById(this.router.snapshot.params['id']).subscribe((res)=>{
      console.log(res,'college')
      this.editCollegeForm = new FormGroup({
        id: new FormControl(),
        ImagePath:new FormControl(''),
        collegeName:new FormControl(res.data.collegeName),
        collegeCode:new FormControl(res.data.collegeCode),
        Address1:new FormControl(res.data.address1),
        Address2:new FormControl(res.data.address2),
        CityId:new FormControl(''),
        StateId:new FormControl(''),
        CountryId:new FormControl(''),
        ContectPerson:new FormControl(res.data.contectPerson),
        ContectEmail:new FormControl(res.data.contectEmail),
        ContectPhone:new FormControl(res.data.contectPhone),
        client:new FormControl(''),
        isActive:new FormControl(),
      })
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

  getClient(){
    this.clientService.getClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
      }
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

  submit(){
    if (this.editCollegeForm.valid){
      const data = this.editCollegeForm.value as UpdateCollege;
      data.ImagePath = this.selectedFileName
      data.isActive = true
      data.id = this.router.snapshot.params['id']
      this.collegeService.updateCollege(data).subscribe((res)=>{
        console.log(res,'update college')
      })
    }
  }

}