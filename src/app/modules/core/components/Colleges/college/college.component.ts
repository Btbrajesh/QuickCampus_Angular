import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CollegeService } from '../../../services/college.service';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CollegedetailModalComponent } from '../../../popups/collegedetail-modal/collegedetail-modal.component';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit{

  collegeList :any[]=[];

  constructor(private modalService: NgbModal,public toastr:ToastrService,private spinnerService: NgxSpinnerService,private collegeService:CollegeService,private router:Router){}

  ngOnInit(): void {
    this.getAllCollegeList()
  }

  getAllCollegeList(){
    this.collegeService.getCollegeList().subscribe(res =>{
      if(res.isSuccess){
        this.collegeList = res.data;
      }
    },err =>{
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
        this.collegeService.deleteByID(itemId).subscribe((res)=>{
          this.toastr.success(res.message)
          this.getAllCollegeList()
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
