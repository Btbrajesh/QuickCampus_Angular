import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoledetailModalComponent } from '../../../popups/roledetail-modal/roledetail-modal.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{

  data!:any

  constructor(private modalService: NgbModal,public roleService:RoleService, public toastr:ToastrService){}

  ngOnInit(): void {
    this.getAllRole()
  }

  getAllRole(){
    this.roleService.getAllRole().subscribe((res)=>{
      this.data = res
    },err =>{
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
