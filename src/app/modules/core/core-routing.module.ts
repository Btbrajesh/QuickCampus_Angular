import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/_helpers/auth.guard";
import { ApplicantlistComponent } from "./components/Applicant/applicantlist/applicantlist.component";
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LayoutComponent } from "../shared/components/layout/layout.component";
import { CollegeComponent } from "./components/Colleges/college/college.component";
import { CampusWalkInComponent } from "./components/Campus/campus-walk-in/campus-walk-in.component";
import { QuestionComponent } from "./components/questions/question/question.component";
import { AddCollegeComponent } from "./components/Colleges/college/add-college/add-college.component";
import { AddCampusComponent } from "./components/Campus/campus-walk-in/add-campus/add-campus.component";
import { ClientComponent } from "./components/Clients/client/client.component";
import { EditClientComponent } from "./components/Clients/client/edit-client/edit-client.component";
import { RoleComponent } from "./components/Role/role/role.component";
import { UserComponent } from "./components/User/user/user.component";
import { AddUserComponent } from "./components/User/user/add-user/add-user.component";
import { AddQuestionComponent } from "./components/questions/question/add-question/add-question.component";
import { EditUserComponent } from "./components/User/user/edit-user/edit-user.component";
import { EditCollegeComponent } from "./components/Colleges/college/edit-college/edit-college.component";
import { AddClientComponent } from "./components/Clients/client/add-client/add-client.component";
import { AddRoleComponent } from "./components/Role/role/add-role/add-role.component";
import { EditApplicantComponent } from "./components/Applicant/applicantlist/edit-applicant/edit-applicant.component";
import { EditRoleComponent } from "./components/Role/role/edit-role/edit-role.component";
import { AddApplicantComponent } from "./components/Applicant/applicantlist/add-applicant/add-applicant.component";

const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {path:'client',component:ClientComponent,canActivate:[AuthGuard]},
        {path: 'applicant',component:ApplicantlistComponent,canActivate: [AuthGuard]},
        {path: 'college',component:CollegeComponent,canActivate: [AuthGuard]},
        {path: 'campus',component:CampusWalkInComponent,canActivate: [AuthGuard]},
        {path: 'question',component:QuestionComponent,canActivate: [AuthGuard]},
        {path: 'add-college',component:AddCollegeComponent,canActivate: [AuthGuard]},
        {path: 'add-campus',component:AddCampusComponent,canActivate: [AuthGuard]},
        {path: 'add-client',component:AddClientComponent,canActivate: [AuthGuard]},
        {path: 'edit-client/:id',component:EditClientComponent,canActivate: [AuthGuard]},
        {path: 'role',component:RoleComponent,canActivate: [AuthGuard]},
        {path: 'user',component:UserComponent,canActivate: [AuthGuard]},
        {path: 'add-user',component:AddUserComponent,canActivate: [AuthGuard]},
        {path: 'add-question',component:AddQuestionComponent,canActivate: [AuthGuard]},
        {path: 'edit-user/:id',component:EditUserComponent,canActivate: [AuthGuard]},
        {path: 'edit-college/:id',component:EditCollegeComponent,canActivate: [AuthGuard]},
        {path: 'add-role',component:AddRoleComponent,canActivate: [AuthGuard]},
        {path: 'add-applicant',component:AddApplicantComponent,canActivate: [AuthGuard]},
        {path: 'edit-applicant/:id',component:EditApplicantComponent,canActivate: [AuthGuard]},
        {path: 'edit-role/:id',component:EditRoleComponent,canActivate: [AuthGuard]},
      ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CoreRoutingModule {}
  