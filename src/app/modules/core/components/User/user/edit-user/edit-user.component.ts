import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/modules/core/services/user.service';
import { User } from 'src/app/modules/master/models/user';
import { ToastrService } from 'ngx-toastr';
import { valHooks } from 'jquery';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  clientList:any
  editForm = new FormGroup({
    id:new FormControl(),
    email: new FormControl(''),
    mobile:new FormControl(''),
  })

  constructor(public toastr:ToastrService,public route:Router, public clientService:ClientService,private router:ActivatedRoute, public userService:UserService){}

  ngOnInit(): void {
    this.getClient()
    this.userService.getCurrentData(this.router.snapshot.params['id']).subscribe((res)=>{
      this.editForm = new FormGroup({
        id: new FormControl(),
        email: new FormControl(res.data['email'],[Validators.required,Validators.email]),
        mobile:new FormControl(res.data['mobile'],[Validators.required,Validators.maxLength(10),Validators.minLength(10)])
      })
    })
    
  }

  getClient(){
    this.clientService.getClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
      }
    },err=>{
      this.toastr.error(err)
    })
  }

  cancel(){
    this.route.navigateByUrl('/admin/user')
  }

  submit(){
    if (this.editForm.valid){
      const formData = this.editForm.value as User;
      formData.id = this.router.snapshot.params['id']
      this.userService.updateUser(formData).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.editForm.reset()
          this.route.navigateByUrl('/admin/user')
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }this.toastr.error('Please fill the form correctly')
    
  }

}
