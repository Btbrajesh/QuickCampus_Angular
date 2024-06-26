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
  obj : any[] = []
  selectedIdsFormArray:any 
  roleName:any
  clientList:any;
  permissionList: any[]= []
  permissionUser:any
  editRoleForm = new FormGroup({
    id:new FormControl(),
    roleName:new FormControl(''),
    clientId:new FormControl(''),
    permission: new FormArray([],[Validators.required])
  })

  constructor(public spinnerService:NgxSpinnerService,public fb:FormBuilder,private router:ActivatedRoute,public route:Router,public roleService:RoleService, public clientService:ClientService, public toastr:ToastrService){}

  ngOnInit(): void {
    this.initializeForm()
    this.roleName = localStorage.getItem('role')
    if (this.roleName == 'Admin'){
      this.getClient()
    }
  }

  initializeForm(){
    this.roleService.getRoleById(this.router.snapshot.params['id']).subscribe((res)=>{
      this.permissionUser = res.data
      this.editRoleForm = new FormGroup({
        id:new FormControl(),
        roleName:new FormControl(res.data['roleName'],[Validators.required,Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]*)*$/)]),
        clientId:new FormControl(res.data['clientId'],[Validators.required]),
        permission: new FormArray([])
      })
      this.getPermissionList()
    },err=>{
      this.toastr.error(err)
    })
  }

  getClient(){
    this.clientService.getAllClientList().subscribe((res)=>{
      if (res.isSuccess){
        this.clientList = res.data.filter((client:any) => client.isActive === true)
      }
    })
  }

  onCheckboxChange(event:any , id: number) {
    this.selectedIdsFormArray = this.editRoleForm.get('permission') as FormArray;

    if (event.target.checked) {
      this.selectedIdsFormArray.push(this.fb.control(id));
    } else {
      const index = this.selectedIdsFormArray.controls.findIndex((x:any) => x.value === id);
      this.selectedIdsFormArray.removeAt(index);
    }
  }

  setPermissions(): void {
    this.permissionList.forEach(pm => {
      const checked = this.permissionUser.permission.some((p:any) => p.id === pm.id);
      pm.IsCheck = checked;
      if(checked){
        this.selectedIdsFormArray = this.editRoleForm.get('permission') as FormArray;
        this.selectedIdsFormArray.push(this.fb.control(pm.id));
      }
    });
  }


  getPermissionList(){
    this.roleService.getAllPermission().subscribe((res)=>{
      if (res.isSuccess){
        this.permissionList = res.data
        this.setPermissions()
      }
    },err=>{
      this.toastr.error(err)
    })
    
  }

  submit(){
    if (this.editRoleForm.valid){
      const formData = this.editRoleForm.value
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
