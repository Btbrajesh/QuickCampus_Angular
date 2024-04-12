import { Component, OnInit } from '@angular/core';
import { CampusService } from '../../../services/campus.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CollegedetailModalComponent } from '../../../popups/collegedetail-modal/collegedetail-modal.component';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { CampusdetailModalComponent } from '../../../popups/campusdetail-modal/campusdetail-modal.component';
import { FormControl } from '@angular/forms';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-campus-walk-in',
  templateUrl: './campus-walk-in.component.html',
  styleUrls: ['./campus-walk-in.component.css']
})
export class CampusWalkInComponent implements OnInit{

  campusList:any[]=[];
  page = 1;
	pageSize = 10;
  collectionSize!:number
  search: string = '';
  pageStart=1
  selectedOption = new FormControl('');
  inputOption = new FormControl('');
  clientList:any
  filteredClientList:any
  val: string = '';

  constructor(public clientService:ClientService,private modalService: NgbModal,public toastr:ToastrService,public campusService:CampusService,private spinnerService: NgxSpinnerService,public router:Router){}

  ngOnInit(): void {
    this.getCampusList()
    this.getClient()
  }

  getCampusList(){
    this.spinnerService.show();
    this.campusService.getCampusList(this.pageStart,this.pageSize).subscribe(res =>{
      if(res.isSuccess){
        this.spinnerService.hide()
        this.collectionSize = res.totalRecordCount
        this.campusList = []
        this.campusList = res.data.map((campus:any,i:number)=>({id:i+1, ...campus}))
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
    this.campusService.getCampusListOnClientId(clientId,this.pageStart,this.pageSize).subscribe((res:any)=>{
      if (res.isSuccess){
        this.campusList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.campusList = res.data;
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
    this.getCampusList() 
    this.getClient()
  }

  getCampusPage(event:any){
    this.pageStart = event
    this.getCampusList()
  }

  getCollectionPage(){
    this.pageStart = 1
    this.getCampusList()
  }

  onSearch() {
    this.campusService.searchData(this.search,this.pageStart,this.pageSize).subscribe((res:any) => {
      if (res.isSuccess){
        this.campusList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.campusList = res.data;
        this.collectionSize = res.totalRecordCount;
      } 
    });
  }

  toggleActive(id: number): void {
    this.spinnerService.show()
    this.campusService.toggleActiveInactive(id).subscribe((res)=>{
      if (res.isSuccess){
        this.getCampusList()
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
        this.campusService.deleteById(itemId).subscribe((res)=>{
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
  
  viewDetails(itemId: number): void {
    const modalRef = this.modalService.open(CampusdetailModalComponent, { size: 'lg' });
    modalRef.componentInstance.itemId = itemId;
  }

}
