import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, CityInfo } from 'src/app/modules/master/models/city';
import { Country, CountryInfo } from 'src/app/modules/master/models/country';
import { State, StateInfo } from 'src/app/modules/master/models/state';
import { CountrystatecityService } from 'src/app/modules/core/services/countrystatecity.service';
import { College } from 'src/app/modules/master/models/college';
import { CollegeService } from '../../../../services/college.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/modules/core/services/client.service';

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
    clientList:any;
    roleName:any

   constructor(public clientService:ClientService,public toastr:ToastrService,public router:Router,public fb:FormBuilder,private countrystatecityService: CountrystatecityService, public collegeService:CollegeService){}

   ngOnInit(): void {
    this.fetchCountry();
     this.addCollegeForm = this.fb.group({
      ImagePath:['',[Validators.required]],
      CollegeName:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]*)*$/)]],
      CollegeCode:['',[Validators.required,Validators.maxLength(10)]],
      Address1:['',[Validators.required,Validators.maxLength(100)]],
      Address2:['',[Validators.maxLength(100)]],
      CityId:['',[Validators.required]],
      StateId:['',[Validators.required]],
      CountryId:['',[Validators.required]],
      ContactPersonName:['',[Validators.required]],
      ContactEmail:['',[Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      ContactPhone:['',[Validators.required,Validators.pattern("^[1-9][0-9]{9}$")]],
      clientId:['',[Validators.required]]
     })

     this.roleName = localStorage.getItem('role')
      if (this.roleName == 'Admin'){
        this.getClient()
      }
   }

   submit(){
    if (this.addCollegeForm.valid){
      this.data = this.addCollegeForm.value
      this.data.ImagePath = this.selectedFileName
      this.collegeService.addCollege(this.data).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.addCollegeForm.reset()
          this.router.navigateByUrl('/admin/college')
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }else{
      this.toastr.error('Please Fill All the Details')
    }
   }

   cancel(){
    this.router.navigateByUrl('/admin/college')
  }

   private fetchCountry(){
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

getClient(){
  this.clientService.getAllClientList().subscribe((res)=>{
    if (res.isSuccess){
      this.clientList = res.data.filter((client:any) => client.isActive === true)
    }
  })
}
}
