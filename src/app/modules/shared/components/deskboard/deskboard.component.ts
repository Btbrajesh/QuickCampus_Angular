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

  lengthOfQuestion:number = 0
  lengthOfApplicant:number = 0
  lengthOfTotalWalk:number = 0
  lengthOfTotalCollege:number = 0
  applicantCountStop:any
  collegeCountStop:any
  walkInCountStop:any
  questionCountStop:any

  ngOnInit(): void {
    this.getApplicant()
    this.getQuestion()
    this.getWalkIn()
    this.getColleges()
  }

  getApplicant(){
    this.applicantService.getAllApplicant().subscribe((res)=>{
      this.applicantCountStop = setInterval(()=>{
        this.lengthOfApplicant++;
        if (this.lengthOfApplicant == res.totalRecordCount)
        {
          clearInterval(this.applicantCountStop)
        }
      },12)
    })
  }

  getWalkIn(){
    this.campusService.getAllCampus().subscribe((res)=>{
      this.walkInCountStop = setInterval(()=>{
        this.lengthOfTotalWalk++;
        if (this.lengthOfTotalWalk == res.totalRecordCount)
        {
          clearInterval(this.walkInCountStop)
        }
      },12)
    })
  }

  getQuestion(){
    this.questionService.getAllQuestion().subscribe((res)=>{
      this.questionCountStop = setInterval(()=>{
        this.lengthOfQuestion++;
        if (this.lengthOfQuestion == res.totalRecordCount)
        {
          clearInterval(this.questionCountStop)
        }
      },12)
    })
  }

  getColleges(){
    const pageStart1=1
    const pageSize1 = 1000
    this.collegeService.getAllCollegeList(pageStart1,pageSize1).subscribe((res)=>{
      this.collegeCountStop = setInterval(()=>{
        this.lengthOfTotalCollege++;
        if (this.lengthOfTotalCollege == res.totalRecordCount)
        {
          clearInterval(this.collegeCountStop)
        }
      },12)
    })
  }

}
