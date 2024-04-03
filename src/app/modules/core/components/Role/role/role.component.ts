import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoledetailModalComponent } from '../../../popups/roledetail-modal/roledetail-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{

  roleList!:any
  page = 1;
	pageSize = 10;
  collectionSize!:number
  searchTerm: string = '';
  pageStart=1

  constructor(private modalService: NgbModal,private spinnerService: NgxSpinnerService,public roleService:RoleService, public toastr:ToastrService){}

  ngOnInit(): void {
    this.getAllRole()
  }

  getAllRole(){
    this.spinnerService.show()
    this.roleService.getAllRole(this.pageStart,this.pageSize).subscribe((res)=>{
      if (res.isSuccess){
        this.collectionSize = res.totalRecordCount
        this.roleList = []
        this.roleList = res.data.map((role:any,i:number)=>({id:i+1, ...role}))
        this.spinnerService.hide()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    },err =>{
      this.spinnerService.hide()
      this.toastr.error(err)
    })
  }

  getRolePage(event:any){
    this.pageStart = event
    this.getAllRole()
  }

  getCollectionPage(){
    this.pageStart = 1
    this.getAllRole()
  }

  viewDetails(itemId: number): void {
    const modalRef = this.modalService.open(RoledetailModalComponent, { size: 'lg' });
    modalRef.componentInstance.itemId = itemId;
  }

  deleteItem(itemId: number): void {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.itemId = itemId;
    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.roleService.deleteRole(itemId).subscribe((res)=>{
          this.toastr.success(res.message)
          this.getAllRole()
        }
        )
      }
    })
  }

  onSearch() {
    this.roleService.searchData(this.searchTerm,this.pageStart,this.pageSize).subscribe((res:any) => {
      if (res.isSuccess){
        this.roleList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.roleList = res.data;
        this.collectionSize = res.totalRecordCount;
      } 
    });
  }
  
  toggleActive(id:number){
    this.spinnerService.show()
    this.roleService.toggleActiveInactive(id).subscribe((res)=>{
      if (res.isSuccess){
        this.getAllRole()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    })
  }

}
