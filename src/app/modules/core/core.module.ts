import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantlistComponent } from './components/applicantlist/applicantlist.component';
import { CoreRoutingModule } from './core-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CollegeComponent } from './components/college/college.component';
import { CampusWalkInComponent } from './components/campus-walk-in/campus-walk-in.component';
import { QuestionComponent } from './components/question/question.component';
import { AddCollegeComponent } from './components/add-college/add-college.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCampusComponent } from './components/add-campus/add-campus.component';

@NgModule({
  declarations: [ApplicantlistComponent, CollegeComponent, CampusWalkInComponent, QuestionComponent, AddCollegeComponent, AddCampusComponent],
  imports: [CommonModule,CoreRoutingModule,DataTablesModule,NgxPaginationModule,NgxSpinnerModule,ReactiveFormsModule,FormsModule],
})
export class CoreModule {}
