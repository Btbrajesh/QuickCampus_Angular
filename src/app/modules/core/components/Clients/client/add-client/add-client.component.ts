import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/modules/master/models/client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { passwordMatchValidator } from '../../../confirm-password.validator';
import { valHooks } from 'jquery';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{

  constructor(public fb:FormBuilder, public clientService:ClientService,public router:Router,public toastr:ToastrService){}

  addClientForm!: FormGroup
  data!:Client
  hidePassword: boolean = true;
  hideConfirmPassword:boolean = true;
  
  ngOnInit(): void {
    this.addClientForm = this.fb.group({
      name:['',[Validators.required,Validators.maxLength(25),Validators.minLength(2)]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      address:['',[Validators.required,Validators.maxLength(50)]],
      subscriptionPlan:['',[Validators.required]],
      username:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]],
      confirmPassword:['',[Validators.required]]
    },{
      validator:passwordMatchValidator()
    })
  }

  submit(){
    if (this.addClientForm.valid){
      this.data = this.addClientForm.value
      this.clientService.addClient(this.data).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.addClientForm.reset()
          this.router.navigateByUrl('/admin/client')
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }else{
      this.toastr.error('Please fill all the details properly')
    }
  }

  close(){
    this.router.navigateByUrl('/admin/client')
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  togglePasswordVisibility2(){
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

}
