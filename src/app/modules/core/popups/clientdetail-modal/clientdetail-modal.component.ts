import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clientdetail-modal',
  templateUrl: './clientdetail-modal.component.html',
  styleUrls: ['./clientdetail-modal.component.css']
})
export class ClientdetailModalComponent implements OnInit{

  @Input() itemId!: number;
  clientDetail: any[]=[]

  constructor(public activeModal: NgbActiveModal,public clientService:ClientService) { }

  ngOnInit(): void {
    this.getDetailById(this.itemId)
  }

  getDetailById(Id:number){
    this.clientService.getDetailById(Id).subscribe((res)=>{
      const data = res.data
      this.clientDetail.push(data)
    })
  }

  cancel(): void {
    // Dismiss modal
    this.activeModal.dismiss();
  }
}
