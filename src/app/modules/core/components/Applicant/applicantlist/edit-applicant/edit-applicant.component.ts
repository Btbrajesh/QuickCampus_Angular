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
  this.applicantService.getApplicantById(this.router.snapshot.params['id']).subscribe((res)=>{
    this.editApplicantForm = new FormGroup({
      applicantID: new FormControl(),
      firstName: new FormControl(res.data['firstName']),
      lastName: new FormControl(res.data['lastName']),
      emailAddress: new FormControl(res.data['emailAddress']),
      phoneNumber:new FormControl(res.data['phoneNumber']),
      collegeName:new FormControl(res.data['collegeName']),
      higestQualification:new FormControl(res.data['higestQualification']),
      higestQualificationPercentage:new FormControl(res.data['higestQualificationPercentage']),
      matricPercentage:new FormControl(res.data['matricPercentage']),
      intermediatePercentage:new FormControl(res.data['intermediatePercentage']),
      skills:new FormControl(res.data['skills']),
      statusId: new FormControl(res.data['statusId']),
      comment: new FormControl(res.data['comment']),
      assignedToCompany: new FormControl(res.data['assignedToCompany']),
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

}
