import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{

  clientList: any[]= []

  constructor(public clientService:ClientService,public router:Router){}

  ngOnInit(): void {
    this.getClientList()
  }

  getClientList(){
    this.clientService.getClientList().subscribe((res)=>{
      if (res.isSuccess){
        console.log(res)
        this.clientList = res.data
      }
    })
  }

  toggleActive(user: any): void {
    user.isActive = !user.isActive;
    // Call your service method to update the user's active status
  }
  
  editUser(user: any): void {
    const url = `/updateApplicant/${user.applicantID}`;
    this.router.navigateByUrl(url);
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
