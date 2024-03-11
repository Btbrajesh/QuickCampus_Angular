import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { valHooks } from 'jquery';
import { ToastrService } from 'ngx-toastr';
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
    email: new FormControl('',Validators.compose([Validators.required,Validators.email]) ),
    phone:new FormControl('',Validators.compose([Validators.required,Validators.minLength(10)])),
    subscriptionPlan:new FormControl('',Validators.required),
  })

  constructor(private router:ActivatedRoute,public route:Router, public clientService:ClientService, public toastr:ToastrService){}

  ngOnInit(): void {
    this.clientService.getDetailById(this.router.snapshot.params['id']).subscribe((res)=>{
      this.editClientForm= new FormGroup({
        id: new FormControl(),
        address: new FormControl(res.data['address']),
        email: new FormControl(res.data['email']),
        phone:new FormControl(res.data['phone']),
        subscriptionPlan:new FormControl(res.data['subscriptionPlan']),
      })
    },err=>{
      this.toastr.error(err)
    })
  }

  submit(){
    if (this.editClientForm.valid){
      const formData = this.editClientForm.value as UpdateClient;
      formData.id = this.router.snapshot.params['id']
      this.clientService.updateDetails(formData).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.editClientForm.reset()
          this.route.navigateByUrl('/admin/client')
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }else{
      this.toastr.error("Please fill all the details properly")
    }
  }

  cancel(){
    this.route.navigateByUrl('/admin/client')
  }

}
