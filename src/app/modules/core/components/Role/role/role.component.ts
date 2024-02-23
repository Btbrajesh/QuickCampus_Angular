import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{

  data!:any

  constructor(public roleService:RoleService){}

  ngOnInit(): void {
    this.getAllRole()
  }

  getAllRole(){
    this.roleService.getAllRole().subscribe((res)=>{
      console.log(res,'role')
      this.data = res
    })
  }
  

}
