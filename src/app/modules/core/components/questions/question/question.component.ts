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
  page = 1;
	pageSize = 10;
  collectionSize!:number
  searchTerm: string = '';
  pageStart=1

  constructor(public toastr:ToastrService,private modalService: NgbModal,public questionService:QuestionService,private spinnerService: NgxSpinnerService,public router:Router){}


  ngOnInit(): void {
    this.getQuestionList()
  }

  getQuestionList(){
    this.spinnerService.show();
    this.questionService.getQuestionList(this.pageStart,this.pageSize).subscribe(res =>{
      if(res.isSuccess){
        this.collectionSize = res.totalRecordCount
        this.questionList = []
        this.questionList = res.data.map((question:any,i:number)=>({id:i+1, ...question}))
        this.spinnerService.hide()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    },err =>{
      this.spinnerService.hide();
      this.toastr.error(err)
    })
  }

  getQuestionPage(event:any){
    this.pageStart = event
    this.getQuestionList()
  }

  toggleActive(id: any): void {
    this.spinnerService.show()
    this.questionService.questionActiveInactive(id).subscribe((res)=>{
      if (res.isSuccess){
        this.getQuestionList()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    })
  }
  
  editUser(user: any): void {
    const url = `/updateApplicant/${user.applicantID}`;
    this.router.navigateByUrl(url);
  }


deleteItem(itemId: number): void {
  const modalRef = this.modalService.open(DeleteModalComponent);
  modalRef.componentInstance.itemId = itemId;
  modalRef.result.then((result) => {
    if (result === 'delete') {
      this.questionService.deleteQuestion(itemId).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.getQuestionList()
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }
  })
}

onSearch() {
  this.questionService.searchData(this.searchTerm,this.pageStart,this.pageSize).subscribe((res:any) => {
    if (res.isSuccess){
      this.questionList = res.data;
      this.collectionSize = res.totalRecordCount;
    }else{
      this.questionList = res.data;
      this.collectionSize = res.totalRecordCount;
    } 
  });
}

}
