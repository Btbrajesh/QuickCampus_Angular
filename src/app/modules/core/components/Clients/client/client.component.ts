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
  page = 1;
	pageSize = 10;
  collectionSize!:number
  searchTerm: string = '';
  pageStart=1
  

  constructor(private modalService: NgbModal,public toastr:ToastrService,public clientService:ClientService,public router:Router,public spinnerService:NgxSpinnerService){}

  ngOnInit(): void {
    this.getClientList()
  }

  getClientList(){
    this.spinnerService.show()
    this.clientService.getClientList(this.pageStart,this.pageSize).subscribe((res)=>{
      if (res.isSuccess){
        this.collectionSize = res.totalRecordCount
        this.clientList = []
        this.clientList = res.data.map((client:any,i:number)=>({id:i+1, ...client}))
        this.spinnerService.hide()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    },err=>{
      this.spinnerService.hide()
      this.toastr.error(err)
    })
  }

  getClientPage(event:any){
    this.pageStart = event
    this.getClientList()
  }

  onSearch() {
    this.clientService.searchData(this.searchTerm,this.pageStart,this.pageSize).subscribe((res:any) => {
      if (res.isSuccess){
        this.clientList = res.data;
        this.collectionSize = res.totalRecordCount;
      }else{
        this.clientList = res.data;
        this.collectionSize = res.totalRecordCount;
      }
      
    });
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

  toggleActive(id: any): void {
    this.spinnerService.show()
    this.clientService.activeInactive(id).subscribe((res)=>{
      if (res.isSuccess){
        this.getClientList()
      }else{
        this.spinnerService.hide()
        this.toastr.error(res.message)
      }
    })
  }

  viewDetails(itemId: number): void {
    const modalRef = this.modalService.open(ClientdetailModalComponent, { size: 'lg' });
    modalRef.componentInstance.itemId = itemId;
  }

}
