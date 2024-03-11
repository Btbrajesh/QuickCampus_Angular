import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampusService } from '../../../services/campus.service';
import { QuestionService } from '../../../services/question.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  questionList:any[]=[];

  constructor(public toastr:ToastrService,private modalService: NgbModal,public questionService:QuestionService,private spinnerService: NgxSpinnerService,public router:Router){}


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

  sanitizeHtml(html: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
}

deleteItem(itemId: number): void {
  const modalRef = this.modalService.open(DeleteModalComponent);
  modalRef.componentInstance.itemId = itemId;
  modalRef.result.then((result) => {
    if (result === 'delete') {
      this.questionService.deleteQuestion(itemId).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.getCampusList()
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }
  })
}

}
