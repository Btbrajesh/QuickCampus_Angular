import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userData:any

  constructor(public toastr:ToastrService,public userService:UserService,public router:Router){}

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.userService.getAllUser().subscribe((res)=>{
      if (res.isSuccess){
        this.userData = res.data
      }
    },err=>{
      this.toastr.error(err)
    })
  }

  toggleActive(user: any): void {
    user.isActive = !user.isActive;
    // Call your service method to update the user's active status
  }
  

}
