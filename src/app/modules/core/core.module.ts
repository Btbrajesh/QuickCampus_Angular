import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantlistComponent } from './components/Applicant/applicantlist/applicantlist.component';
import { CoreRoutingModule } from './core-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CollegeComponent } from './components/Colleges/college/college.component';
import { CampusWalkInComponent } from './components/Campus/campus-walk-in/campus-walk-in.component';
import { QuestionComponent } from './components/questions/question/question.component';
import { AddCollegeComponent } from './components/Colleges/add-college/add-college.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCampusComponent } from './components/Campus/add-campus/add-campus.component';
import { ClientComponent } from './components/Clients/client/client.component';
import { AddClientComponent } from './components/Clients/add-client/add-client.component';
import { EditClientComponent } from './components/Clients/client/edit-client/edit-client.component';
import { RoleComponent } from './components/Role/role/role.component';
import { UserComponent } from './components/User/user/user.component';
import { AddUserComponent } from './components/User/add-user/add-user.component';

@NgModule({
  declarations: [ApplicantlistComponent, CollegeComponent, CampusWalkInComponent, QuestionComponent, AddCollegeComponent, AddCampusComponent, ClientComponent, AddClientComponent, EditClientComponent, RoleComponent, UserComponent, AddUserComponent],
  imports: [CommonModule,CoreRoutingModule,DataTablesModule,NgxPaginationModule,NgxSpinnerModule,ReactiveFormsModule,FormsModule],
})
export class CoreModule {}
