import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{

  clientList: any[]= []

  constructor(public clientService:ClientService,public router:Router,public spinnerService:NgxSpinnerService){}

  ngOnInit(): void {
    this.getClientList()
  }

  getClientList(){
    this.spinnerService.show()
    this.clientService.getClientList().subscribe((res)=>{
      if (res.isSuccess){
        this.clientList = res.data
        this.spinnerService.hide()
      }
    })
  }

  toggleActive(id: any): void {
    this.clientService.activeInactive(id).subscribe((res)=>{
      console.log(res,'acitve')
    })
    // user.isActive = !user.isActive;
    // Call your service method to update the user's active status
  }

  
  

  edit(id:number){
    console.log(id)
  }

  delete(id:number){
    this.clientService.deleteClient(id).subscribe((res)=>{
      console.log(res)
    })
  }

}
