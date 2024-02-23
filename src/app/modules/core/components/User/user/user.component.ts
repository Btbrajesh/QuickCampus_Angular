import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userData:any

  constructor(public userService:UserService,public router:Router){}

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.userService.getAllUser().subscribe((res)=>{
      if (res.isSuccess){
        this.userData = res.data
      }
    })
  }

  toggleActive(user: any): void {
    user.isActive = !user.isActive;
    // Call your service method to update the user's active status
  }
  
  editUser(user: any): void {
    const url = `/updateApplicant/${user.applicantID}`;
    this.router.navigateByUrl(url);
  }

}
