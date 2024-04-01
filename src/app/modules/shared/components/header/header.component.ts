import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userRoleName!:string | null;
  userName!: string | null;

  constructor(private authenticationService :AuthenticationService){
    this.userRoleName = localStorage.getItem('userRoleName')
    this.userName = localStorage.getItem('userName')
  }

  ngOnInit(): void {
    
  }

  logout(){
    this.authenticationService.logout();
  }
}
