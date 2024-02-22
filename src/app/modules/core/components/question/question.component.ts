import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampusService } from '../../services/campus.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  questionList:any[]=[];

  constructor(public questionService:QuestionService,private spinnerService: NgxSpinnerService,public router:Router){}


  ngOnInit(): void {
    this.getCampusList()
  }

  getCampusList(){
    this.spinnerService.show();
    this.questionService.getQuestionList().subscribe(res =>{
      if(res.isSuccess){
        this.spinnerService.hide();
        this.questionList = res.data;
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
