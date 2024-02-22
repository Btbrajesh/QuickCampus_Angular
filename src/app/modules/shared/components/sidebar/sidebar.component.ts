import { Component, OnInit } from '@angular/core';
import { AuthDataResponse } from 'src/app/_models/authData';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userPermissions :any;
  clientPermissions :any;
  userRole!: AuthDataResponse[];
  public userRoleLoaded: boolean = false;
  baseUrl = environment.apiUrl;
  sidebarMenu:any[]=[];
  quickCampusItems:any={
    text:'',
    heading: false,
    link: '',     // internal route links
    elink: '',    // used only for external links
    target: '',   // anchor target="_blank|_self|_parent|_top|framename"
    icon: '',
    alert: '',
    sref:'',
    label:'',
    translate:'',
    submenu:''
  }

  constructor(private authenticationService :AuthenticationService){
    this.authenticationService.user.subscribe(user => {
      if (user && user.roleMasters) {
        this.userRole = user.roleMasters;
        this.sidebarList(this.userRole);
        this.userRoleLoaded = true;
      }
    });


  }

  ngOnInit(): void {
   
  }


  sidebarList(items:any){
    for (var i = 0; i < items.length; i++) {
      var item = items[i]; 
      this.quickCampusItems=[]
      if(item.roleName === 'ClientAdmin'){
        this.quickCampusItems.text = 'Client Admin';
        this.quickCampusItems.icon = 'fa fa-home';
        this.quickCampusItems.label = 'label label-info';
        this.quickCampusItems.link = `/roleList`;
      }else if (item.roleName === 'SuperAdmin') {
        this.quickCampusItems.text = 'Super Admin';                 
        this.quickCampusItems.icon = 'fa fa-university';
        this.quickCampusItems.label = 'label label-info';
        this.quickCampusItems.link = `/addRole`;
    }
    this.sidebarMenu.push(this.quickCampusItems);

    }

  }
}
