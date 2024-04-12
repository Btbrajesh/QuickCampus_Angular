import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApplicantService } from '../../../services/applicant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicantdetailModalComponent } from '../../../popups/applicantdetail-modal/applicantdetail-modal.component';
import { FormControl } from '@angular/forms';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-applicantlist',
  templateUrl: './applicantlist.component.html',
  styleUrls: ['./applicantlist.component.css']
})
export class ApplicantlistComponent implements OnInit {
  
  applicantList :any[]=[];
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
 
  constructor(public clientService:ClientService,private modalService: NgbModal,public toastr:ToastrService,private applicantService: ApplicantService,private router: Router,private spinnerService: NgxSpinnerService){
   
  }

ngOnInit(): void {
  this.getApplicantList();
  this.getClient()
}

getApplicantList(){
  this.spinnerService.show();
  this.applicantService.getApplicantList(this.pageStart,this.pageSize).subscribe(res =>{
    if(res.isSuccess){
      this.spinnerService.hide()
      this.collectionSize = res.totalRecordCount
      this.applicantList = []
        this.applicantList = res.data.map((applicant:any,i:number)=>({id:i+1, ...applicant}))
        this.spinnerService.hide()
    }else{
      this.spinnerService.hide()
      this.toastr.error(res.message)
    }
  },err=>{
    this.spinnerService.hide();
    this.toastr.error(err)
  })
}

getApplicantPage(event:any){
  this.pageStart = event
  this.getApplicantList()
}

getCollectionPage(){
  this.pageStart = 1
  this.getApplicantList()
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
  this.applicantService.getApplicantListOnClientId(clientId,this.pageStart,this.pageSize).subscribe((res:any)=>{
    if (res.isSuccess){
      this.applicantList = res.data;
      this.collectionSize = res.totalRecordCount;
    }else{
      this.applicantList = res.data;
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
  this.getApplicantList() 
  this.getClient()
}

onSearch() {
  this.applicantService.searchData(this.searchTerm,this.pageStart,this.pageSize).subscribe((res:any) => {
    if (res.isSuccess){
      this.applicantList = res.data;
      this.collectionSize = res.totalRecordCount;
    }else{
      this.applicantList = res.data;
      this.collectionSize = res.totalRecordCount;
    } 
  });
}

deleteItem(itemId: number): void {
  const modalRef = this.modalService.open(DeleteModalComponent);
  modalRef.componentInstance.itemId = itemId;
  modalRef.result.then((result) => {
    if (result === 'delete') {
      this.applicantService.deleteApplicant(itemId).subscribe((res)=>{
        this.toastr.success(res.message)
        this.getApplicantList()
      },err=>{
        this.toastr.error(err)
      })
    }
  })
}

viewDetails(itemId: number): void {
  const modalRef = this.modalService.open(ApplicantdetailModalComponent, { size: 'lg' });
  modalRef.componentInstance.itemId = itemId;
}


  toggleActive(id: number): void {
    this.spinnerService.show()
    this.applicantService.applicantActiveInactive(id).subscribe((res)=>{
      if (res.isSuccess){
        this.getApplicantList()
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

}
