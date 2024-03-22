import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicantService } from 'src/app/modules/core/services/applicant.service';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { CollegeService } from 'src/app/modules/core/services/college.service';
import { CommonService } from 'src/app/modules/core/services/common.service';
import { Applicant } from 'src/app/modules/master/models/applicant';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit{
  
  addApplicantForm!:FormGroup;
  statusList :any;
  companyList :any;
  collegeList:any;
  qualificationList:any;
  clientList:any;

  constructor(public clientService:ClientService,public toastr:ToastrService,public router:Router,private applicantService:ApplicantService,public fb:FormBuilder,public collegeService:CollegeService,public commonService:CommonService){}

  ngOnInit(): void {
    this.addApplicantForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern('^[A-Za-z]+$')]],
      emailAddress: ['',[Validators.required,Validators.email]],
      phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      highestQualification:['',[Validators.required]],
      highestQualificationPercentage:['',[Validators.required,Validators.max(100),Validators.min(0)]],
      matricPercentage:['',[Validators.required,Validators.max(100),Validators.min(0)]],
      intermediatePercentage:['',[Validators.required,Validators.max(100),Validators.min(0)]],
      skills:['',[Validators.required]],
      statusId:['',[Validators.required]],
      comment:['',[Validators.required]],
      collegeId:['',[Validators.required]],
      assignedToCompany:['',[Validators.required]],
      clientId:['',[Validators.required]]
    })
    this.getStatus()
    this.getCompany()
    this.getCollege()
    this.getQualification()
    this.getClient()
  }

  submit(){
    if (this.addApplicantForm.valid){
      const data = this.addApplicantForm.value as Applicant
      this.applicantService.addApplicant(data).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.addApplicantForm.reset()
          this.router.navigateByUrl('/admin/applicant')
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }else{
      this.toastr.error('Please fill all the details properly')
    }
  }

  cancel(){
    this.router.navigateByUrl('/admin/applicant')
  }

  getStatus(){
    this.applicantService.getStatusList().subscribe((res)=>{
      if (res.isSuccess){
        this.statusList = res.data
      }
     
    })
  }

  getCompany(){
    this.applicantService.getCompanyList().subscribe((res)=>{
      if (res.isSuccess){
        this.companyList = res.data
      }
    })
  }

  getCollege(){
    this.collegeService.getCollegeList().subscribe((res)=>{
      if (res.isSuccess){
        this.collegeList = res.data
      }
    })
  }

  getQualification(){
    this.commonService.getQualification().subscribe((res)=>{
      if (res.isSuccess){
        this.qualificationList = res.data
      }
    })
  }

  getClient(){
    this.clientService.getClientList().subscribe((res)=>{
      this.clientList = res.data
    })
  }

}
