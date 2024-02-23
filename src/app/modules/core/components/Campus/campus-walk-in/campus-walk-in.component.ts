import { Component, OnInit } from '@angular/core';
import { CampusService } from '../../../services/campus.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campus-walk-in',
  templateUrl: './campus-walk-in.component.html',
  styleUrls: ['./campus-walk-in.component.css']
})
export class CampusWalkInComponent implements OnInit{

  campusList:any[]=[];

  constructor(public campusService:CampusService,private spinnerService: NgxSpinnerService,public router:Router){}

  ngOnInit(): void {
    this.getCampusList()
  }

  getCampusList(){
    this.spinnerService.show();
    this.campusService.getCampusList().subscribe(res =>{
      if(res.isSuccess){
        this.spinnerService.hide();
        this.campusList = res.data;
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
