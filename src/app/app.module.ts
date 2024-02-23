import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicantlistComponent } from './modules/core/components/Applicant/applicantlist/applicantlist.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fack-backend';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AddUpdateRoleComponent } from './modules/master/components/roles/add-update-role/add-update-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleListComponent } from './modules/master/components/roles/role-list/role-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreRoutingModule } from './modules/core/core-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    AddUpdateRoleComponent,
    RoleListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreRoutingModule,
    SharedModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    FormsModule,
    ToastrModule.forRoot({positionClass: 'toast-top-right'}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
