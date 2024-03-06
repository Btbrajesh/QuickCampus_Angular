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
import { AddCollegeComponent } from './components/Colleges/college/add-college/add-college.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCampusComponent } from './components/Campus/campus-walk-in/add-campus/add-campus.component';
import { ClientComponent } from './components/Clients/client/client.component';
import { EditClientComponent } from './components/Clients/client/edit-client/edit-client.component';
import { RoleComponent } from './components/Role/role/role.component';
import { UserComponent } from './components/User/user/user.component';
import { AddUserComponent } from './components/User/user/add-user/add-user.component';
import { AddQuestionComponent } from './components/questions/question/add-question/add-question.component';
import { EditUserComponent } from './components/User/user/edit-user/edit-user.component';
import { EditCollegeComponent } from './components/Colleges/college/edit-college/edit-college.component';
import { AddClientComponent } from './components/Clients/client/add-client/add-client.component';
import { AddRoleComponent } from './components/Role/role/add-role/add-role.component';
import { EditApplicantComponent } from './components/Applicant/applicantlist/edit-applicant/edit-applicant.component';
import { EditRoleComponent } from './components/Role/role/edit-role/edit-role.component';
import { AddApplicantComponent } from './components/Applicant/applicantlist/add-applicant/add-applicant.component';
import { EditQuestionComponent } from './components/questions/question/edit-question/edit-question.component';
import { DeleteModalComponent } from './popups/delete-modal/delete-modal.component';
import { ClientdetailModalComponent } from './popups/clientdetail-modal/clientdetail-modal.component';
import { RoledetailModalComponent } from './popups/roledetail-modal/roledetail-modal.component';
import { UserdetailModalComponent } from './popups/userdetail-modal/userdetail-modal.component';
import { ApplicantdetailModalComponent } from './popups/applicantdetail-modal/applicantdetail-modal.component';
import { CollegedetailModalComponent } from './popups/collegedetail-modal/collegedetail-modal.component';
import { CampusdetailModalComponent } from './popups/campusdetail-modal/campusdetail-modal.component';

@NgModule({
  declarations: [ApplicantlistComponent, CollegeComponent, CampusWalkInComponent, QuestionComponent, AddCollegeComponent, AddCampusComponent, ClientComponent, AddClientComponent, EditClientComponent, RoleComponent, UserComponent, AddUserComponent, AddQuestionComponent, EditUserComponent, EditCollegeComponent, AddRoleComponent, EditApplicantComponent, EditRoleComponent, AddApplicantComponent, EditQuestionComponent,DeleteModalComponent, ClientdetailModalComponent, RoledetailModalComponent, UserdetailModalComponent, ApplicantdetailModalComponent, CollegedetailModalComponent, CampusdetailModalComponent],
  imports: [CommonModule,CoreRoutingModule,DataTablesModule,NgxPaginationModule,NgxSpinnerModule,ReactiveFormsModule,FormsModule],
})
export class CoreModule {}
