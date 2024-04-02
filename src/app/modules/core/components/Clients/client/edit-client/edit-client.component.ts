import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { valHooks } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { UpdateClient } from 'src/app/modules/master/models/client';
import { RoleService } from 'src/app/modules/master/services/role.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit{

  roleList:any[]=[]
  editClientForm= new FormGroup({
    id: new FormControl(),
    name: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl('' ),
    phone:new FormControl(''),
    subscriptionPlan:new FormControl(''),
    roleId:new FormControl('')
  })

  constructor(private router:ActivatedRoute,public route:Router, public clientService:ClientService, public toastr:ToastrService,public roleService:RoleService){}

  ngOnInit(): void {
    this.clientService.getDetailById(this.router.snapshot.params['id']).subscribe((res)=>{
      this.editClientForm= new FormGroup({
        id: new FormControl(),
        name:new FormControl(res.data['name'],Validators.compose([Validators.required,Validators.maxLength(25),Validators.minLength(2),Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]*)*$/)])),
        address: new FormControl(res.data['address'], Validators.compose([Validators.required,Validators.maxLength(50)])),
        email: new FormControl(res.data['email'],Validators.compose([Validators.required,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)])),
        phone:new FormControl(res.data['phone'],Validators.compose([Validators.required,Validators.pattern("^[1-9][0-9]{9}$")])),
        subscriptionPlan:new FormControl(res.data['subscriptionPlan'],Validators.required),
        roleId:new FormControl(res.data['roleId'],[Validators.required])
      })
    },err=>{
      this.toastr.error(err)
    })
    this.getAllRole()
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

  getAllRole(){
    this.roleService.getAllRole().subscribe((res)=>{
      this.roleList =res.data
    })
  }

}
