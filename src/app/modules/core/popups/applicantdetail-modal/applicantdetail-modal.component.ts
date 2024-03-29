import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ApplicantService } from '../../services/applicant.service';

@Component({
  selector: 'app-applicantdetail-modal',
  templateUrl: './applicantdetail-modal.component.html',
  styleUrls: ['./applicantdetail-modal.component.css']
})
export class ApplicantdetailModalComponent {

  @Input() itemId!: number;
  applicantDetail: any[]=[]

  constructor(public toastr:ToastrService,public activeModal: NgbActiveModal,public applicantService:ApplicantService) { }


  ngOnInit(): void {
    this.getDetailById(this.itemId)
  }

  getDetailById(Id:number){
    this.applicantService.getApplicantById(Id).subscribe((res)=>{
      if (res.isSuccess){
        const data = res.data
        this.applicantDetail.push(data)
      }else{
        this.toastr.error(res.message)
      }
    })
  }

  cancel(): void {
    // Dismiss modal
    this.activeModal.dismiss();
  }

}
