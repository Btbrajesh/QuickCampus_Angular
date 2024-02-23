import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollegeService } from '../../../services/college.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit{

  collegeList :any[]=[];

  constructor(private spinnerService: NgxSpinnerService,private collegeService:CollegeService,private router:Router){}

  ngOnInit(): void {
    this.getAllCollegeList()
  }

  getAllCollegeList(){
    this.spinnerService.show();
    this.collegeService.getCollegeList().subscribe(res =>{
      if(res.isSuccess){
        this.spinnerService.hide();
        this.collegeList = res.data;
        console.log(this.collegeList)
      }
    },err =>{
      this.spinnerService.hide();
      console.log("Error in applicant list",err);
    })
  }

  toggleActive(user: any): void {
    user.isActive = !user.isActive;
    // Call your service method to update the user's active status
  }
  
  editUser(user: any): void {
    const url = `/updateApplicant/${user.applicantID}`;
    this.router.navigateByUrl(url);
  }

}
