import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampusService } from '../../../services/campus.service';
import { QuestionService } from '../../../services/question.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { ClientService } from '../../../services/client.service';

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
  selectedOption = new FormControl('');
  inputOption = new FormControl('');
  clientList:any
  filteredClientList:any
  val: string = '';

  constructor(public clientService:ClientService,public toastr:ToastrService,private modalService: NgbModal,public questionService:QuestionService,private spinnerService: NgxSpinnerService,public router:Router){}


  ngOnInit(): void {
    this.getQuestionList()
    this.getClient()
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

  getClient(){
    this.clientService.getAllClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
        this.filteredClientList = res.data
      }
    },err=>{
      this.toastr.error(err)
    })
  }
  
  onSelected(event:any){
    const clientId = event.value
    this.questionService.getQuestionListOnClientId(clientId,this.pageStart,this.pageSize).subscribe((res:any)=>{
      if (res.isSuccess){
        this.questionList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.questionList = res.data;
        this.collectionSize = res.totalRecordCount;
        this.toastr.error(res.message)
      }
    })
  }
  
  filterOptions() {
    if (this.clientList) { // Check if this.clientList is defined
      this.filteredClientList = this.clientList.filter((client:any) => {
        // Check if client.name and this.val are not null before calling toLowerCase()
        if (client.name && this.val) {
          return client.name.toLowerCase().includes(this.val.toLowerCase());
        }
        return false; // Return false if either client.name or this.val is null
      });
    } else {
      this.filteredClientList = []; // Set filteredClientList to an empty array if this.clientList is undefined
    }
  }
  
  resetSelect() {
    this.selectedOption.reset(); // Reset selected option
    this.inputOption.reset();
    this.getQuestionList();
    this.getClient();
  }

  getQuestionPage(event:any){
    this.pageStart = event
    this.getQuestionList()
  }

  getCollectionPage(){
    this.pageStart = 1
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
