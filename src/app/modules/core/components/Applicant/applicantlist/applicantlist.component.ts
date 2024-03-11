import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApplicantService } from '../../../services/applicant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicantdetailModalComponent } from '../../../popups/applicantdetail-modal/applicantdetail-modal.component';

@Component({
  selector: 'app-applicantlist',
  templateUrl: './applicantlist.component.html',
  styleUrls: ['./applicantlist.component.css']
})
export class ApplicantlistComponent implements OnInit {
  posts: any;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtColumns: DataTables.ColumnSettings[] = [];
  pageLength:number = 10;
  lastPage = 0;
  dtInstance: any;
  isLength!: boolean;
  allUsers: any = [];
  applicantList :any[]=[];
  p: number = 1;
 
  constructor(private modalService: NgbModal,public toastr:ToastrService,private applicantService: ApplicantService,private router: Router,private spinnerService: NgxSpinnerService){
   
  }

ngOnInit(): void {
  this.getApplicantList();
}

getApplicantList(){
  this.spinnerService.show();
  this.applicantService.getApplicantList().subscribe(resp =>{
    if(resp.isSuccess){
      this.spinnerService.hide();
      this.applicantList = resp.data;
      this.applicantList.map((applicant) => {
        applicant.fullName = `${applicant.firstName} ${applicant.lastName}`;
      });
    }
  },err=>{
    this.spinnerService.hide();
    this.toastr.error(err)
  })
}

deleteItem(itemId: number): void {
  const modalRef = this.modalService.open(DeleteModalComponent);
  modalRef.componentInstance.itemId = itemId;
  modalRef.result.then((result) => {
    if (result === 'delete') {
      this.applicantService.deleteApplicant(itemId).subscribe((res)=>{
        this.toastr.success(res.message)
        this.getApplicantList()
      },err=>{
        this.toastr.error(err)
      })
    }
  })
}

viewDetails(itemId: number): void {
  const modalRef = this.modalService.open(ApplicantdetailModalComponent, { size: 'lg' });
  modalRef.componentInstance.itemId = itemId;
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

  toggleActive(user: any): void {
    user.isActive = !user.isActive;
    // Call your service method to update the user's active status
  }
  
  editUser(user: any): void {
    const url = `/updateApplicant/${user.applicantID}`;
    this.router.navigateByUrl(url);
  }

}
