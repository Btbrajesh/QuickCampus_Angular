import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CollegeService } from '../../services/college.service';
import { CampusService } from '../../services/campus.service';

@Component({
  selector: 'app-campusdetail-modal',
  templateUrl: './campusdetail-modal.component.html',
  styleUrls: ['./campusdetail-modal.component.css']
})
export class CampusdetailModalComponent {

  @Input() itemId!: number;
  campusDetail: any[]=[]

  constructor(public toastr:ToastrService,public activeModal: NgbActiveModal,public campusService:CampusService) { }



  ngOnInit(): void {
    this.getDetailById(this.itemId)
  }

  getDetailById(Id:number){
    this.campusService.getCampusById(Id).subscribe((res)=>{
      console.log(res)
      if (res.isSuccess){
        const data = res.data
        this.campusDetail.push(data)
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
