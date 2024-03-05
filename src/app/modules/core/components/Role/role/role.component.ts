import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{

  data!:any

  constructor(public roleService:RoleService, public toastr:ToastrService){}

  ngOnInit(): void {
    this.getAllRole()
  }

  getAllRole(){
    this.roleService.getAllRole().subscribe((res)=>{
      this.data = res
    },err =>{
      this.toastr.error("Error in applicant list",err)
    })
  }
  

}
