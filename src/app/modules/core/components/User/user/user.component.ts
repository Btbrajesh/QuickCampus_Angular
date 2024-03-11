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

  userData:any

  constructor(private modalService: NgbModal,public spinnerService:NgxSpinnerService,public toastr:ToastrService,public userService:UserService,public router:Router){}

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.spinnerService.show()
    this.userService.getAllUser().subscribe((res)=>{
      if (res.isSuccess){
        this.spinnerService.hide()
        this.userData = res.data
      }
    },err=>{
      this.spinnerService.hide()
      this.toastr.error(err)
    })
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
          this.getAll()
        }
        )
      }
    })
  }

  toggleActive(user: any): void {
    user.isActive = !user.isActive;
    // Call your service method to update the user's active status
  }
  

}
