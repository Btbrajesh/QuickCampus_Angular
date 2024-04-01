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
  permissionList: any[]= []
  permissionUser:any
  editRoleForm = new FormGroup({
    id:new FormControl(),
    roleName:new FormControl(''),
    client:new FormControl(''),
    permission: new FormArray([],[Validators.required])
  })

  constructor(public spinnerService:NgxSpinnerService,public fb:FormBuilder,private router:ActivatedRoute,public route:Router,public roleService:RoleService, public clientService:ClientService, public toastr:ToastrService){}

  ngOnInit(): void {
   
    this.initializeForm()
    
  }

  initializeForm(){
    this.roleService.getRoleById(this.router.snapshot.params['id']).subscribe((res)=>{
      console.log(res)
      this.permissionUser = res.data
      console.log(this.permissionUser.permission)
      this.editRoleForm = new FormGroup({
        id:new FormControl(),
        roleName:new FormControl(res.data['roleName'],[Validators.required,Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]*)*$/)]),
        client:new FormControl(''),
        permission: new FormArray([])
      })
      this.getPermissionList()
    },err=>{
      this.toastr.error(err)
    })
  }

  // get permission() {
  //   return this.editRoleForm.get('permission') as FormArray;
  // }

  onCheckboxChange(event:any, id: number) {
    this.selectedIdsFormArray = this.editRoleForm.get('permission') as FormArray;

    if (event.target.checked) {
      this.selectedIdsFormArray.push(this.fb.control(id));
    } else {
      const index = this.selectedIdsFormArray.controls.findIndex((x:any) => x.value === id);
      this.selectedIdsFormArray.removeAt(index);
    }
    
  }

  setPermissions(): void {
    //const permissionFormArray = this.editRoleForm.get('permission') as FormArray;
    this.permissionList.forEach(pm => {
      const checked = this.permissionUser.permission.some((p:any) => p.id === pm.id);
      pm.IsCheck = checked;
      //permissionFormArray.push(this.fb.control(checked));
    });
    console.log(this.permissionList);
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

  submit() {
    if (this.editRoleForm.valid) {
      const selectedPermissions = this.editRoleForm.value.permission || []; // Newly selected permissions from the form
      // const previouslySelectedPermissions = this.permissionList.filter(pm => pm.IsCheck).map(pm => pm.id); // Previously selected permissions fetched from the API
  
      // Merge both arrays to include all selected permissions
      const allSelectedPermissions = [...selectedPermissions];
  
      const formData = {
        id: this.router.snapshot.params['id'],
        roleName: this.editRoleForm.value.roleName,
        client: this.editRoleForm.value.client,
        permission: allSelectedPermissions // Set the permissions array in the formData object
      };
  
      // Send formData to your backend API
      this.roleService.updateRole(formData).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.toastr.success(res.message);
            this.editRoleForm.reset();
            this.route.navigateByUrl('/admin/role');
          } else {
            this.toastr.error(res.message);
          }
        },
        (err) => {
          this.toastr.error(err);
        }
      );
    } else {
      this.toastr.error('Please fill the form properly');
    }
  }

  // submit(){
  //   if (this.editRoleForm.valid){
  //     const formData = this.editRoleForm.value
  //     formData.id = this.router.snapshot.params['id']
  //     this.roleService.updateRole(formData).subscribe((res)=>{
  //       if (res.isSuccess){
  //         this.toastr.success(res.message)
  //         this.editRoleForm.reset()
  //         this.route.navigateByUrl('/admin/role')
  //       }else{
  //         this.toastr.error(res.message)
  //       }
  //     },err=>{
  //       this.toastr.error(err)
  //     })
  //   }else{
  //     this.toastr.error("Please fill the form Properly")
  //   }
    
  // }

  cancel(){
    this.route.navigateByUrl('/admin/role')
  }
}
