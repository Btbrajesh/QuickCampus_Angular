import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { RoleResponseList } from '../../../models/roleResponseModal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roleList:RoleResponseList[]=[];
  p: number = 1;
  isLength!: boolean;
  selectAll: boolean = false;
  userPermission:any;
  addpermission:boolean =false;
  updatepermission :boolean = false;
  deletePermission : boolean = false;
  activeInActivePermission:boolean= false;

  constructor(private roleService:RoleService,private spinnerService: NgxSpinnerService,private authenticationService :AuthenticationService){
   
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.roleService.getAllRole().subscribe(resp =>{
  this.spinnerService.hide();
  this.isLength = true;
  if(resp.length>0){
    this.isLength = false;
    this.roleList = resp;
  }
});

this.authenticationService.user.subscribe(user => {
  if (user && user.roleMasters) {
    this.userPermission = user.roleMasters;
    for(var i=0; i<this.userPermission.length;i++){

      if(this.userPermission[i].rolePermissions[0].permissionName == 'AddRole'){
         this.addpermission = true;
      }
      if (this.userPermission[i].rolePermissions[1].permissionName=='UpdateRole'){
       this.updatepermission = true;
      }
      if(this.userPermission[i].rolePermissions[2].permissionName=='ActiveRole')
        this.activeInActivePermission = true;
    }
  }
});
    
  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    for (let role of this.roleList) {
        role.checked = isChecked;
    }
}
}
