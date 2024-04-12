import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../../services/client.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ApplicantService } from '../../../../services/applicant.service';
import { Applicant } from 'src/app/modules/master/models/applicant';
import { CollegeService } from 'src/app/modules/core/services/college.service';
import { CommonService } from 'src/app/modules/core/services/common.service';

@Component({
  selector: 'app-edit-applicant',
  templateUrl: './edit-applicant.component.html',
  styleUrls: ['./edit-applicant.component.css']
})
export class EditApplicantComponent implements OnInit{

  statusList :any;
  companyList :any;
  collegeList:any;
  qualificationList:any;
  editApplicantForm!: FormGroup
  clientList:any;
  roleName:any

  constructor(public clientService:ClientService,public fb:FormBuilder,private router:ActivatedRoute,public route:Router, public applicantService:ApplicantService, public toastr:ToastrService,public collegeService:CollegeService,public commonService:CommonService){}


ngOnInit(): void {
  this.getCompany()
  this.getStatus()
  this.getCollege()
  this.getQualification()
  this.initForm()
  this.loadApplicationData()
  this.roleName = localStorage.getItem('role')
    if (this.roleName == 'Admin'){
      this.getClient()
    }
}

initForm() {
  this.editApplicantForm = this.fb.group({
    applicantID: [''],
    firstName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern(/^[A-Za-z]*$/)]],
    lastName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern(/^[A-Za-z]*$/)]],
    emailAddress: ['',[Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    phoneNumber:['',[Validators.required,Validators.pattern("^[1-9][0-9]{9}$")]],
    collegeId:['',[Validators.required]],
    highestQualification:['',[Validators.required]],
    highestQualificationPercentage:['',[Validators.required,Validators.max(100),Validators.min(0)]],
    matricPercentage:['',[Validators.required,Validators.max(100),Validators.min(0)]],
    intermediatePercentage:['',[Validators.required,Validators.max(100),Validators.min(0)]],
    statusId: ['',[Validators.required]],
    comment: ['',[Validators.maxLength(1000)]],
    passingYear:['',[Validators.maxLength(4)]],
    clientId:[''],
    skilltype: this.fb.array([]),
  })
}

loadApplicationData() {
  const applicantId = this.router.snapshot.params['id'];
  this.applicantService.getApplicantById(applicantId).subscribe((res)=> {
    console.log(res)
    this.editApplicantForm.patchValue(res.data);
    this.patchOptionsArray(res.data.skilltype);
  });
}

patchOptionsArray(options: any[]) {
  if (options && options.length) {
    const optionsFormArray = this.editApplicantForm.get('skilltype') as FormArray;
    options.forEach(option => {
      optionsFormArray.push(this.fb.group(option));
    });
  }
}

get skilltype() : FormArray {
  return this.editApplicantForm.get("skilltype") as FormArray
}

newSkill():FormGroup{
  return this.fb.group({
    skillId:[0],
    skillName:[''],
  })
}

getClient(){
  this.clientService.getAllClientList().subscribe((res)=>{
    if (res.isSuccess){
      this.clientList = res.data.filter((client:any) => client.isActive === true)
    }
  })
}

addSkill() {
  this.skilltype.push(this.newSkill());
}

removeSkill(i:number) {
  this.skilltype.removeAt(i);
}

submit(){
  console.log(this.editApplicantForm.value)
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
      this.companyList = res.data.filter((company:any) => company.isActive === true)
    }
  })
}

getCollege(){
  const pageStart1=1
    const pageSize1 = 1000
  this.collegeService.getAllCollegeList(pageStart1,pageSize1).subscribe((res)=>{
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

}
