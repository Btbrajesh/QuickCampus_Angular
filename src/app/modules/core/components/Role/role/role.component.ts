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

  constructor(private modalService: NgbModal,private spinnerService: NgxSpinnerService,public roleService:RoleService, public toastr:ToastrService){}

  ngOnInit(): void {
    this.getAllRole()
  }

  getAllRole(){
    this.spinnerService.show()
    this.roleService.getAllRole().subscribe((res)=>{
      if (res.isSuccess){
        this.collectionSize = res.data.length
        this.roleList = res.data.map((role:any,i:number)=>({id:i+1, ...role})).slice(
          (this.page - 1) * this.pageSize,
			    (this.page - 1) * this.pageSize + this.pageSize,
        )
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
  

}
