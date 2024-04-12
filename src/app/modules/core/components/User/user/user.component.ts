import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { UserdetailModalComponent } from '../../../popups/userdetail-modal/userdetail-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '../../../services/client.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userList:any
  clientList:any
  filteredClientList:any
  page = 1;
	pageSize = 10;
  collectionSize!:number
  searchTerm: string = '';
  pageStart=1
  userId:any
  val: string = '';
  selectedOption = new FormControl('');
  inputOption = new FormControl('');

  constructor(public clientService:ClientService ,private modalService: NgbModal,public spinnerService:NgxSpinnerService,public toastr:ToastrService,public userService:UserService,public router:Router){}

  ngOnInit(): void {
    this.getAllUser()
    this.getClient()
    this.userId = localStorage.getItem('userId')
  }

  getAllUser(){
    this.spinnerService.show()
    this.userService.getAllUser(this.pageStart,this.pageSize).subscribe((res)=>{
      if (res.isSuccess){
        this.spinnerService.hide()
        this.collectionSize = res.totalRecordCount
        this.userList = []
        this.userList = res.data.map((user:any,i:number)=>({id:i+1, ...user}))
        this.spinnerService.hide()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    },err=>{
      this.spinnerService.hide()
      this.toastr.error(err)
    })
  }

  getUserPage(event:any){
    this.pageStart = event
    this.getAllUser()
  }

  getCollectionPage(){
    this.pageStart = 1
    this.getAllUser()
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
    this.userService.getUserListOnClientId(clientId,this.pageStart,this.pageSize).subscribe((res:any)=>{
      if (res.isSuccess){
        this.userList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.userList = res.data;
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
    this.getAllUser() 
    this.getClient()
  }

  onSearch() {
    this.userService.searchData(this.searchTerm,this.pageStart,this.pageSize).subscribe((res:any) => {
      if (res.isSuccess){
        this.userList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.userList = res.data;
        this.collectionSize = res.totalRecordCount;
      }
    });
  }

  viewDetails(itemId: number): void {
    const modalRef = this.modalService.open(UserdetailModalComponent, { size: 'lg' });
    modalRef.componentInstance.itemId = itemId;
  }

  deleteItem(itemId: number): void {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.itemId = itemId;
    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.userService.deleteUser(itemId).subscribe((res)=>{
          this.toastr.success(res.message)
          this.getAllUser()
        },err=>{
          this.toastr.error(err)
        })
      }
    })
  }

  toggleActive(id: number): void {
    this.spinnerService.show()
    this.userService.toggleActiveAndInactive(id).subscribe((res)=>{
      if (res.isSuccess){
        this.getAllUser()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    })
  }
  

}
