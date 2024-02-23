import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from 'src/app/modules/master/models/client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{

  constructor(public fb:FormBuilder, public clientService:ClientService){}

  addClientForm!: FormGroup
  data!:Client
  
  ngOnInit(): void {
    this.addClientForm = this.fb.group({
      name:[''],
      email:[''],
      phone:[''],
      address:[''],
      subscriptionPlan:[''],
      username:[''],
      password:[''],
      confirmPassword:['']
    })
  }

  submit(){
    if (this.addClientForm.valid){
      this.data = this.addClientForm.value
      this.clientService.addClient(this.data).subscribe((res)=>{
        console.log(res,'res')
      })
    }
    console.log(this.addClientForm.value)
  }

}
