import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { UpdateClient } from 'src/app/modules/master/models/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit{

  
  editClientForm= new FormGroup({
    id: new FormControl(),
    address: new FormControl(''),
    email: new FormControl(''),
    phone:new FormControl(''),
    subscriptionPlan:new FormControl('')
  })

  constructor(private router:ActivatedRoute, public clientService:ClientService){}

  ngOnInit(): void {
    this.clientService.getDetailById(this.router.snapshot.params['id']).subscribe((res)=>{
      console.log(res,'client')
      this.editClientForm= new FormGroup({
        id: new FormControl(),
        address: new FormControl(res.data['address']),
        email: new FormControl(res.data['email']),
        phone:new FormControl(res.data['phone']),
        subscriptionPlan:new FormControl(res.data['subscriptionPlan'])
      })
    })
    this.router.snapshot.params['id']
  }

  submit(){
    if (this.editClientForm.valid){
      const formData = this.editClientForm.value as UpdateClient;
      formData.id = this.router.snapshot.params['id']
      this.clientService.updateDetails(formData).subscribe((res)=>{
        console.log(res,'updateclient')
      })
    }
  }

  

}
