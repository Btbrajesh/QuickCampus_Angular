import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/_helpers/auth.guard";
import { ApplicantlistComponent } from "./components/applicantlist/applicantlist.component";
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LayoutComponent } from "../shared/components/layout/layout.component";
import { CollegeComponent } from "./components/college/college.component";
import { CampusWalkInComponent } from "./components/campus-walk-in/campus-walk-in.component";
import { QuestionComponent } from "./components/question/question.component";
import { AddCollegeComponent } from "./components/add-college/add-college.component";
import { AddCampusComponent } from "./components/add-campus/add-campus.component";

const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {path: 'applicant',component:ApplicantlistComponent,canActivate: [AuthGuard]},
        {path: 'college',component:CollegeComponent,canActivate: [AuthGuard]},
        {path: 'campus',component:CampusWalkInComponent,canActivate: [AuthGuard]},
        {path: 'question',component:QuestionComponent,canActivate: [AuthGuard]},
        {path: 'add-college',component:AddCollegeComponent,canActivate: [AuthGuard]},
        {path: 'add-campus',component:AddCampusComponent,canActivate: [AuthGuard]},
      ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CoreRoutingModule {}
  