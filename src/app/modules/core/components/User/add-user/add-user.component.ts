import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { ClientService } from '../../../services/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  roleList:any
  clientList:any
  addRoleForm!: FormGroup

  constructor(public roleService:RoleService,public clientService:ClientService,public fb:FormBuilder){}

  ngOnInit(): void {
    this.getRole()
    this.getClient()
    this.addRoleForm = this.fb.group({
      
    })

  }

  getRole(){
    this.roleService.getAllRole().subscribe((res)=>{
        this.roleList = res
    })
  }

  getClient(){
    this.clientService.getClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
      }
    })
  }

}
