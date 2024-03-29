import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '../../../../services/client.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../../services/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit{


  permissionList: any[]= []
  addRoleForm!:FormGroup


  constructor(public toastr:ToastrService,public roleService:RoleService,public fb:FormBuilder,public clientService:ClientService,public router:Router,public spinnerService:NgxSpinnerService){}


  ngOnInit(): void {
    this.getPermissionList()
    this.addRoleForm = this.fb.group({
      roleName:['',[Validators.required,Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]*)*$/)]],
      permission: this.fb.array([],)
    })

  }


  get permission() {
    return this.addRoleForm.get('permission') as FormArray;
  }

  onCheckboxChange(event:any, id: number) {
    const selectedIdsFormArray = this.addRoleForm.get('permission') as FormArray;

    if (event.target.checked) {
      selectedIdsFormArray.push(this.fb.control(id));
    } else {
      const index = selectedIdsFormArray.controls.findIndex(x => x.value === id);
      selectedIdsFormArray.removeAt(index);
    }
  }
  
  getPermissionList(){
    this.roleService.getAllPermission().subscribe((res)=>{
      if (res.isSuccess){
        this.permissionList = res.data
      }else{
        this.toastr.error(res.message)
      }
    },err =>{
      this.toastr.error("Error in applicant list",err)
    })
  }

  submit(){
    if (this.addRoleForm.valid){
      const data = this.addRoleForm.value
      this.roleService.addRole(data).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.addRoleForm.reset()
          this.router.navigateByUrl('/admin/role')
        }else{
          this.toastr.error(res.message)
        }
      },err =>{
        this.toastr.error("Error in applicant list",err)
      })
    }else{
      this.toastr.error("Please fill the form correctly")
    }
  }

  cancel(){
    this.router.navigateByUrl('/admin/role')
  }

}
