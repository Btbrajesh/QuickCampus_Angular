import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../../services/client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApplicantService } from '../../../../services/applicant.service';
import { Applicant } from 'src/app/modules/master/models/applicant';

@Component({
  selector: 'app-edit-applicant',
  templateUrl: './edit-applicant.component.html',
  styleUrls: ['./edit-applicant.component.css']
})
export class EditApplicantComponent implements OnInit{

  statusList :any;
  companyList :any;
  editApplicantForm= new FormGroup({
    applicantID: new FormControl(),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailAddress: new FormControl('',Validators.compose([Validators.required,Validators.email]) ),
    phoneNumber:new FormControl('',Validators.compose([Validators.required,Validators.minLength(10)])),
    higestQualification:new FormControl(''),
    higestQualificationPercentage:new FormControl(''),
    matricPercentage:new FormControl(''),
    collegeName:new FormControl(''),
    intermediatePercentage:new FormControl(''),
    skills:new FormControl(''),
    statusId: new FormControl(),
    comment: new FormControl(),
    assignedToCompany: new FormControl(),
  })

  constructor(private router:ActivatedRoute,public route:Router, public applicantService:ApplicantService, public toastr:ToastrService){}


ngOnInit(): void {
  this.getCompany()
  this.getStatus()
  this.applicantService.getApplicantById(this.router.snapshot.params['id']).subscribe((res)=>{
    this.editApplicantForm = new FormGroup({
      applicantID: new FormControl(),
      firstName: new FormControl(res.data['firstName'],[Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
      lastName: new FormControl(res.data['lastName'],[Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
      emailAddress: new FormControl(res.data['emailAddress'],[Validators.required,Validators.email]),
      phoneNumber:new FormControl(res.data['phoneNumber'],[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      collegeName:new FormControl(res.data['collegeName'],[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
      higestQualification:new FormControl(res.data['higestQualification'],[Validators.required]),
      higestQualificationPercentage:new FormControl(res.data['higestQualificationPercentage'],[Validators.required]),
      matricPercentage:new FormControl(res.data['matricPercentage'],[Validators.required]),
      intermediatePercentage:new FormControl(res.data['intermediatePercentage'],[Validators.required]),
      skills:new FormControl(res.data['skills'],[Validators.required]),
      statusId: new FormControl(res.data['statusId'],[Validators.required]),
      comment: new FormControl(res.data['comment'],[Validators.required]),
      assignedToCompany: new FormControl(res.data['assignedToCompany'],[Validators.required]),
    })
  },err=>{
    this.toastr.error(err)
  })
}

submit(){
  if (this.editApplicantForm.valid){
    const formData = this.editApplicantForm.value as Applicant;
    formData.applicantID = this.router.snapshot.params['id']
    this.applicantService.updateApplicant(formData).subscribe((res)=>{
      if (res.isSuccess){
        this.toastr.success(res.message)
        this.route.navigateByUrl('/admin/applicant')
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

cancel(){
  this.route.navigateByUrl('/admin/applicant')
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

}
