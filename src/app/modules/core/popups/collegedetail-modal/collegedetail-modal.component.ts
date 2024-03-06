import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CollegeService } from '../../services/college.service';

@Component({
  selector: 'app-collegedetail-modal',
  templateUrl: './collegedetail-modal.component.html',
  styleUrls: ['./collegedetail-modal.component.css']
})
export class CollegedetailModalComponent {

  @Input() itemId!: number;
  collegeDetail: any[]=[]

  constructor(public toastr:ToastrService,public activeModal: NgbActiveModal,public collegeService:CollegeService) { }


  ngOnInit(): void {
    this.getDetailById(this.itemId)
  }

  getDetailById(Id:number){
    this.collegeService.getDetailById(Id).subscribe((res)=>{
      console.log(res,'college')
      if (res.isSuccess){
        const data = res.data
        this.collegeDetail.push(data)
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
