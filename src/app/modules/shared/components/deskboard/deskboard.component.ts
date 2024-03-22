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
    // this.getApplicant()
    this.getQuestion()
    this.getWalkIn()
    this.getColleges()
  }

  // getApplicant(){
  //   this.applicantService.getApplicantList().subscribe((res)=>{
  //     this.lengthOfApplicant = res.data.length
  //   })
  // }

  getWalkIn(){
    this.campusService.getCampusList().subscribe((res)=>{
      this.lengthOfTotalWalk = res.data.length
    })
  }

  getQuestion(){
    this.questionService.getQuestionList().subscribe((res)=>{
      this.lengthOfQuestion = res.data.length
    })
  }

  getColleges(){
    this.collegeService.getCollegeList().subscribe((res)=>{
      this.lengthOfTotalCollege = res.data.length
    })
  }

}
