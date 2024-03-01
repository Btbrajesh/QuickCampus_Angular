import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/modules/core/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/core/services/user.service';
import { User } from 'src/app/modules/master/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  clientList:any
  editForm = new FormGroup({
    id:new FormControl(),
    email: new FormControl(''),
    mobile:new FormControl(''),
  })

  constructor(public clientService:ClientService,private router:ActivatedRoute, public userService:UserService){}

  ngOnInit(): void {
    this.getClient()
    this.userService.getCurrentData(this.router.snapshot.params['id']).subscribe((res)=>{
      this.editForm = new FormGroup({
        id: new FormControl(),
        email: new FormControl(res.data['email']),
        mobile:new FormControl(res.data['mobile'])
      })
    })
    
  }

  getClient(){
    this.clientService.getClientList().subscribe((res)=>{
      if(res.isSuccess){
        this.clientList = res.data
      }
    })
  }

  submit(){
    if (this.editForm.valid){
      const formData = this.editForm.value as User;
      formData.id = this.router.snapshot.params['id']
      this.userService.updateUser(formData).subscribe((res)=>{
        console.log(res,'update')
      })
    }
    
  }

}