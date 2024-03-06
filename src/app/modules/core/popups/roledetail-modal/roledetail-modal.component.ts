import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../services/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roledetail-modal',
  templateUrl: './roledetail-modal.component.html',
  styleUrls: ['./roledetail-modal.component.css']
})
export class RoledetailModalComponent implements OnInit{

  @Input() itemId!: number;
  roleDetail: any[]=[]

  constructor(public toastr:ToastrService,public activeModal: NgbActiveModal,public roleService:RoleService) { }

  ngOnInit(): void {
    this.getDetailById(this.itemId)
  }

  getDetailById(Id:number){
    this.roleService.getRoleById(Id).subscribe((res)=>{
      if (res.isSuccess){
        const data = res.data
        this.roleDetail.push(data)
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
