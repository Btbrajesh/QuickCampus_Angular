import { Component, OnInit } from '@angular/core';
import { CampusService } from '../../../services/campus.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CollegedetailModalComponent } from '../../../popups/collegedetail-modal/collegedetail-modal.component';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
import { CampusdetailModalComponent } from '../../../popups/campusdetail-modal/campusdetail-modal.component';

@Component({
  selector: 'app-campus-walk-in',
  templateUrl: './campus-walk-in.component.html',
  styleUrls: ['./campus-walk-in.component.css']
})
export class CampusWalkInComponent implements OnInit{

  campusList:any[]=[];

  constructor(private modalService: NgbModal,public toastr:ToastrService,public campusService:CampusService,private spinnerService: NgxSpinnerService,public router:Router){}

  ngOnInit(): void {
    this.getCampusList()
  }

  getCampusList(){
    this.spinnerService.show();
    this.campusService.getCampusList().subscribe(res =>{
      if(res.isSuccess){
        this.spinnerService.hide();
        this.campusList = res.data;
      }
    },err =>{
      this.spinnerService.hide();
      this.toastr.error(err)
    })
  }

  toggleActive(user: any): void {
    user.isActive = !user.isActive;
    // Call your service method to update the user's active status
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
