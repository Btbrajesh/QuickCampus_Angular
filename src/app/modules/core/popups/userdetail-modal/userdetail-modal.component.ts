import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userdetail-modal',
  templateUrl: './userdetail-modal.component.html',
  styleUrls: ['./userdetail-modal.component.css']
})
export class UserdetailModalComponent {

  @Input() itemId!: number;
  userDetail: any[]=[]

  constructor(public toastr:ToastrService,public activeModal: NgbActiveModal,public userService:UserService) { }


  ngOnInit(): void {
    this.getDetailById(this.itemId)
  }

  getDetailById(Id:number){
    this.userService.getUserById(Id).subscribe((res)=>{
      console.log(res,'re')
      if (res.isSuccess){
        const data = res.data
        this.userDetail.push(data)
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
