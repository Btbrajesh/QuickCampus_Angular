import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollegeService } from '../../../services/college.service';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CollegedetailModalComponent } from '../../../popups/collegedetail-modal/collegedetail-modal.component';
import { FormControl } from '@angular/forms';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit{

  collegeList :any[]=[];
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

  constructor(public clientService:ClientService,private modalService: NgbModal,public toastr:ToastrService,private spinnerService: NgxSpinnerService,private collegeService:CollegeService,private router:Router){}

  ngOnInit(): void {
    this.getCollegeList()
    this.getClient()
  }

  getCollegeList(){
    this.collegeService.getCollegeList(this.pageStart,this.pageSize).subscribe(res =>{
      if(res.isSuccess){
        this.collectionSize = res.totalRecordCount
        this.collegeList=[]
        this.collegeList = res.data.map((college:any,i:number)=>({id:i+1, ...college}))
        this.spinnerService.hide()
      }
    },err =>{
      this.toastr.error(err)
    })
  }


  onSearch() {
    this.collegeService.searchData(this.searchTerm,this.pageStart,this.pageSize).subscribe((res:any) => {
      if (res.isSuccess){
        this.collegeList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.collegeList = res.data;
        this.collectionSize = res.totalRecordCount;
      }
      
    });
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
    this.collegeService.getCollegeListOnClientId(clientId,this.pageStart,this.pageSize).subscribe((res:any)=>{
      if (res.isSuccess){
        this.collegeList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.collegeList = res.data;
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
    this.getCollegeList() 
    this.getClient()
  }

  getCollegePage(event:any){
    this.pageStart = event
    this.getCollegeList()
  }

  getCollectionPage(){
    this.pageStart = 1
    this.getCollegeList()
  }

  toggleActive(id: number): void {
    this.spinnerService.show()
    this.collegeService.toggleActiveInactive(id).subscribe((res)=>{
      if (res.isSuccess){
        this.getCollegeList()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    })
  }
  
  deleteItem(itemId: number): void {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.itemId = itemId;
    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.collegeService.deleteByID(itemId).subscribe((res)=>{
          this.toastr.success(res.message)
          this.getCollegeList()
        },err=>{
          this.toastr.error(err)
        })
      }
    })
  }
  
  viewDetails(itemId: number): void {
    const modalRef = this.modalService.open(CollegedetailModalComponent, { size: 'lg' });
    modalRef.componentInstance.itemId = itemId;
  }

}
