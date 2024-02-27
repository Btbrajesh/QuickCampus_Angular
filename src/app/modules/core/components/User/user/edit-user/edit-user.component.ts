import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/modules/core/services/client.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  clientList:any

  constructor(public clientService:ClientService){}

  ngOnInit(): void {
    this.getClient()
  }

  getClient(){
    this.clientService.getClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
      }
    })
  }

}
