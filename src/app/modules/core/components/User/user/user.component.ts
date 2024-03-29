import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { UserdetailModalComponent } from '../../../popups/userdetail-modal/userdetail-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userList:any
  page = 1;
	pageSize = 10;
  collectionSize!:number
  searchTerm: string = '';
  pageStart=1

  constructor(private modalService: NgbModal,public spinnerService:NgxSpinnerService,public toastr:ToastrService,public userService:UserService,public router:Router){}

  ngOnInit(): void {
    this.getAllUser()
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
