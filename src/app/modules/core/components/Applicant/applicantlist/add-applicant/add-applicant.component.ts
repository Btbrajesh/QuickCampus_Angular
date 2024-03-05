import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApplicantService } from 'src/app/modules/core/services/applicant.service';
import { CampusService } from 'src/app/modules/core/services/campus.service';
import { CollegeService } from 'src/app/modules/core/services/college.service';
import { Applicant } from 'src/app/modules/master/models/applicant';
import { CountrystatecityService } from 'src/app/modules/shared/services/countrystatecity.service';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.css']
})
export class AddApplicantComponent implements OnInit{
  
  addApplicantForm!:FormGroup;

  constructor(public toastr:ToastrService,public router:Router,private applicantService:ApplicantService,public fb:FormBuilder,public campusService:CampusService){}

  ngOnInit(): void {
    this.addApplicantForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      lastName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
      emailAddress: ['',[Validators.required,Validators.email]],
      phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      higestQualification:['',[Validators.required]],
      higestQualificationPercentage:['',[Validators.required,]],
      matricPercentage:['',[Validators.required]],
      collegeName:['',[Validators.required]],
      intermediatePercentage:['',[Validators.required]],
      skills:['',[Validators.required]],
      comment:['',[Validators.required]],
      statusId:[''],
      assignedToCompany:['']
    })
  }

  submit(){
    if (this.addApplicantForm.valid){
      const data = this.addApplicantForm.value as Applicant
      data.statusId = 0
      data.assignedToCompany = 0
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

}
