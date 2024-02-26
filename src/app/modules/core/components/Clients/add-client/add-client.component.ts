import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from 'src/app/modules/master/models/client';
import { passwordMatchValidator } from '../../confirm-password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{

  constructor(public fb:FormBuilder, public clientService:ClientService,public router:Router){}

  addClientForm!: FormGroup
  data!:Client
  hidePassword: boolean = true;
  hideConfirmPassword:boolean = true;
  
  ngOnInit(): void {
    this.addClientForm = this.fb.group({
      name:['',[Validators.required,Validators.maxLength(25),Validators.minLength(2)]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.maxLength(10)]],
      address:['',[Validators.required,Validators.maxLength(50)]],
      subscriptionPlan:['',[Validators.required]],
      username:['',[Validators.required,Validators.maxLength(15)]],
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
        console.log(res,'res')
      })
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
