import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import { ClientService } from '../../../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { passwordMatchValidator } from '../../../confirm-password.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  roleList:any
  clientList:any
  addUserForm!: FormGroup
  hidePassword: boolean = true;
  hideConfirmPassword:boolean = true;
  eyeIconSrc: string = '../../../../../../assets/images/hide.png';
  eyeIconSrc2: string = '../../../../../../assets/images/hide.png';

  constructor(public router:Router, public roleService:RoleService,private toastr: ToastrService,public clientService:ClientService,public fb:FormBuilder,public userService:UserService){}

  ngOnInit(): void {
    // this.getRole()
    // this.getClient()
    this.addUserForm = this.fb.group({
      name:['',[Validators.required,Validators.maxLength(25),Validators.minLength(2),Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]*)*$/)]],
      email:['',[Validators.required,Validators.email]],
      mobile:['',[Validators.required,,Validators.pattern("^[1-9][0-9]{9}$")]],
      // role:['',[Validators.required]],
      // client:['',[Validators.required]],
      password:['',[Validators.required,Validators.maxLength(15),Validators.minLength(8),Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPassword:['',[Validators.required]]
    },{
      validator:passwordMatchValidator()
    })

  }

  // getRole(){
  //   this.roleService.getAllRoleList().subscribe((res)=>{
  //       this.roleList = res.data
  //   })
  // }

  // getClient(){
  //   this.clientService.getAllClientList().subscribe((res)=>{
  //     if(res.isSuccess){
  //       this.clientList = res.data
  //     }
  //   },err=>{
  //     this.toastr.error(err)
  //   })
  // }

  submit(){
    if (this.addUserForm.valid){
      const data = this.addUserForm.value
      this.userService.addUser(data).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.addUserForm.reset()
          this.router.navigateByUrl('/admin/user')
        }else {
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }else{
      this.toastr.error('Please fill the form with valid values')
    }
  }

  cancel(){
    this.router.navigateByUrl('/admin/user')
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    if (this.hidePassword) {
        this.eyeIconSrc = '../../../../../../assets/images/hide.png'; // Path to the icon for hidden password
    } else {
        this.eyeIconSrc = '../../../../../../assets/images/visible.png'; // Path to the icon for visible password
    }
  }

  togglePasswordVisibility2(){
    this.hideConfirmPassword = !this.hideConfirmPassword;
    if (this.hideConfirmPassword) {
        this.eyeIconSrc2 = '../../../../../../assets/images/hide.png'; // Path to the icon for hidden password
    } else {
        this.eyeIconSrc2 = '../../../../../../assets/images/visible.png'; // Path to the icon for visible password
    }
  }

}
