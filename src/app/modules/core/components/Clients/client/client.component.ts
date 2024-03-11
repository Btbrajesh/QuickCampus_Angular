import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../../../popups/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientdetailModalComponent } from '../../../popups/clientdetail-modal/clientdetail-modal.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{

  clientList: any[]= []

  constructor(private modalService: NgbModal,public toastr:ToastrService,public clientService:ClientService,public router:Router,public spinnerService:NgxSpinnerService){}

  ngOnInit(): void {
    this.getClientList()
  }

  getClientList(){
    this.clientService.getClientList().subscribe((res)=>{
      if (res.isSuccess){
        this.clientList = res.data
        
      }
    },err=>{
      this.toastr.error(err)
    })
  }

  toggleActive(id: any): void {
    this.clientService.activeInactive(id).subscribe((res)=>{
    })
  
  }

  deleteItem(itemId: number): void {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.itemId = itemId;
    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.clientService.deleteClient(itemId).subscribe((res)=>{
          this.toastr.success(res.message)
          this.getClientList()
        }
        )
      }
    })
  }

  viewDetails(itemId: number): void {
    const modalRef = this.modalService.open(ClientdetailModalComponent, { size: 'lg' });
    modalRef.componentInstance.itemId = itemId;
  }

}
