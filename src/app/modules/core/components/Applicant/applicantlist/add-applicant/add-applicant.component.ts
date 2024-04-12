import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  skillList:any;
  roleName:any

  constructor(public clientService:ClientService,public toastr:ToastrService,public router:Router,private applicantService:ApplicantService,public fb:FormBuilder,public collegeService:CollegeService,public commonService:CommonService){}

  ngOnInit(): void {
    this.addApplicantForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern(/^[A-Za-z]*$/)]],
      lastName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern(/^[A-Za-z]*$/)]],
      emailAddress: ['',[Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      phoneNumber:['',[Validators.required,Validators.pattern("^[1-9][0-9]{9}$")]],
      highestQualification:['',[Validators.required]],
      highestQualificationPercentage:['',[Validators.required,Validators.max(100),Validators.min(0)]],
      matricPercentage:['',[Validators.required,Validators.max(100),Validators.min(0)]],
      intermediatePercentage:['',[Validators.required,Validators.max(100),Validators.min(0)]],
      statusId:['',[Validators.required]],
      comment:['',[Validators.maxLength(1000)]],
      collegeId:['',[Validators.required]],
      clientId:['',[Validators.required]],
      passingYear:['',[Validators.maxLength(4)]],
      skilltype:this.fb.array([],Validators.required),
    })
    this.getStatus()
    this.getCompany()
    this.getCollege()
    this.getQualification()
    this.addSkill()
    
    this.roleName = localStorage.getItem('role')
    if (this.roleName == 'Admin'){
      this.getClient()
    }
  }

  
 

  getAllSkills(){
    this.applicantService.getAllSkill().subscribe((res)=>{
      if (res.isSuccess){
        this.skillList = res.data
      }
    })
  }

  get skilltype() : FormArray {
    return this.addApplicantForm.get("skilltype") as FormArray
  }

  newSkill():FormGroup{
    return this.fb.group({
      skillId:[0],
      skillName:['',Validators.required],
    })
  }

  addSkill() {
    this.skilltype.push(this.newSkill());
  }

  removeSkill(i:number) {
    this.skilltype.removeAt(i);
  }

  submit(){
    if (this.addApplicantForm.valid){
      const data = this.addApplicantForm.value as Applicant
      if (this.roleName == 'Admin'){
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
        data.clientId = localStorage.getItem('clientId')
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
      }
      
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
        this.companyList = res.data.filter((company:any) => company.isActive === true)
      }
    })
  }

  getCollege(){
    const pageStart1=1
    const pageSize1 = 1000
    this.collegeService.getAllCollegeList(pageStart1,pageSize1).subscribe((res:any)=>{
      if (res.isSuccess){
        this.collegeList = res.data.filter((college:any) => college.isActive === true)
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
    this.clientService.getAllClientList().subscribe((res)=>{
      if (res.isSuccess){
        this.clientList = res.data.filter((client:any) => client.isActive === true)
      }
    })
  }

}
