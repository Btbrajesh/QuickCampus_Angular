import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { City, CityInfo } from 'src/app/modules/master/models/city';
import { Country, CountryInfo } from 'src/app/modules/master/models/country';
import { State, StateInfo } from 'src/app/modules/master/models/state';
import { CountrystatecityService } from 'src/app/modules/shared/services/countrystatecity.service';
import { College, UpdateCollege } from 'src/app/modules/master/models/college';
import { CollegeService } from 'src/app/modules/core/services/college.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { ToastrService } from 'ngx-toastr';

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
    countryId!:number
    stateId!:number
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
    })

    constructor(public route:Router,public toastr:ToastrService,public clientService:ClientService,private router:ActivatedRoute,public fb:FormBuilder,private countrystatecityService: CountrystatecityService, public collegeService:CollegeService){}


  ngOnInit(): void {
    this.fetchCountry();
    this.getClient()
    this.collegeService.getCollegeById(this.router.snapshot.params['id']).subscribe((res)=>{
      this.onCountrySelected(res.data.countryId) 
      this.onStateSelected(res.data.stateId)
      this.editCollegeForm = new FormGroup({
        id: new FormControl(),
        ImagePath:new FormControl(''),
        collegeName:new FormControl(res.data.collegeName,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
        collegeCode:new FormControl(res.data.collegeCode,[Validators.required]),
        Address1:new FormControl(res.data.address1,[Validators.required,Validators.maxLength(40)]),
        Address2:new FormControl(res.data.address2,[Validators.required,Validators.maxLength(40)]),
        CityId:new FormControl(res.data.cityId,[Validators.required]),
        StateId:new FormControl(res.data.stateId,[Validators.required]),
        CountryId:new FormControl(res.data.countryId,[Validators.required]),
        ContectPerson:new FormControl(res.data.contectPerson,[Validators.required,Validators.minLength(2)]),
        ContectEmail:new FormControl(res.data.contectEmail,[Validators.required,Validators.email]),
        ContectPhone:new FormControl(res.data.contectPhone,[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
        client:new FormControl('',[Validators.required]),
      })
    },err=>{
      this.toastr.error(err)
    })
   }

  fetchCountry(){
    this.countrystatecityService.getCountry().subscribe((data)=>{
      this.listcountry = data
      this.countryInfoList = this.listcountry.data
    },err=>{
      this.toastr.error(err)
    })
  }

  
  onCountrySelected(countryId: number){
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

  getClient(){
    this.clientService.getClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
      }
    },err=>{
      this.toastr.error(err)
    })
  }

  cancel(){
    this.route.navigateByUrl('/admin/college')
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0];
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
      data.id = this.router.snapshot.params['id']
      this.collegeService.updateCollege(data).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }else{
      this.toastr.error("Please Fill All the Details")
    }
  }

}
