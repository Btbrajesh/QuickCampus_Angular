import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/modules/core/services/applicant.service';
import { CampusService } from 'src/app/modules/core/services/campus.service';
import { CollegeService } from 'src/app/modules/core/services/college.service';
import { QuestionService } from 'src/app/modules/core/services/question.service';

@Component({
  selector: 'app-deskboard',
  templateUrl: './deskboard.component.html',
  styleUrls: ['./deskboard.component.css']
})
export class DeskboardComponent implements OnInit{

  constructor(public collegeService:CollegeService,public applicantService:ApplicantService,public questionService:QuestionService,public campusService:CampusService){}

  lengthOfQuestion!:number
  lengthOfApplicant!:number
  lengthOfTotalWalk!:number
  lengthOfTotalCollege!:number

  ngOnInit(): void {
    this.getApplicant()
    this.getQuestion()
    this.getWalkIn()
    this.getColleges()
  }

  getApplicant(){
    this.applicantService.getAllApplicant().subscribe((res)=>{
      this.lengthOfApplicant = res.totalRecordCount
    })
  }

  getWalkIn(){
    this.campusService.getAllCampus().subscribe((res)=>{
      this.lengthOfTotalWalk = res.totalRecordCount
    })
  }

  getQuestion(){
    this.questionService.getAllQuestion().subscribe((res)=>{
      this.lengthOfQuestion = res.totalRecordCount
    })
  }

  getColleges(){
    const pageStart1=1
    const pageSize1 = 1000
    this.collegeService.getAllCollegeList(pageStart1,pageSize1).subscribe((res)=>{
      this.lengthOfTotalCollege = res.totalRecordCount
    })
  }

}
