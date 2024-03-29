import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { RoleService } from 'src/app/modules/core/services/role.service';
import { Role } from 'src/app/modules/master/models/role';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit{

  permissionList: any[]= []
  editRoleForm = new FormGroup({
    id:new FormControl(),
    roleName:new FormControl(''),
    client:new FormControl(''),
    permission: new FormArray([],[Validators.required])
  })

  constructor(public spinnerService:NgxSpinnerService,public fb:FormBuilder,private router:ActivatedRoute,public route:Router,public roleService:RoleService, public clientService:ClientService, public toastr:ToastrService){}

  ngOnInit(): void {
    this.getPermissionList()
    this.roleService.getRoleById(this.router.snapshot.params['id']).subscribe((res)=>{
      this.editRoleForm = new FormGroup({
        id:new FormControl(),
        roleName:new FormControl(res.data['roleName'],Validators.required),
        client:new FormControl(''),
        permission: new FormArray([],Validators.required)
      })
    },err=>{
      this.toastr.error(err)
    })
  }

  get permission() {
    return this.editRoleForm.get('permission') as FormArray;
  }

  onCheckboxChange(event:any, id: number) {
    const selectedIdsFormArray = this.editRoleForm.get('permission') as FormArray;

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
      }
    },err=>{
      this.toastr.error(err)
    })
  }

  submit(){
    if (this.editRoleForm.valid){
      const formData = this.editRoleForm.value as Role
      formData.id = this.router.snapshot.params['id']
      this.roleService.updateRole(formData).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.editRoleForm.reset()
          this.route.navigateByUrl('/admin/role')
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }else{
      this.toastr.error("Please fill the form Properly")
    }
    
  }

  cancel(){
    this.route.navigateByUrl('/admin/role')
  }
}
