import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/shared/components/layout/layout.component';
import { LoginComponent } from './modules/shared/components/login/login.component';
import { Page404Component } from './modules/shared/components/page404/page404.component';
import { Page500Component } from './modules/shared/components/page500/page500.component';
import { Role } from './_models/role';
import { AuthGuard } from './_helpers/auth.guard';
import { DeskboardComponent } from './modules/shared/components/deskboard/deskboard.component';
import { AddUpdateRoleComponent } from './modules/master/components/roles/add-update-role/add-update-role.component';
import { RoleListComponent } from './modules/master/components/roles/role-list/role-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login',component:LoginComponent},
  {
    path: '',
    component: LayoutComponent, // Use the MainLayoutComponent as the layout for authenticated pages
    children: [
      { path: 'dashboard', component: DeskboardComponent},
       {path: 'addRole', component: AddUpdateRoleComponent,canActivate: [AuthGuard]},
       {path : 'roleList',component: RoleListComponent, canActivate: [AuthGuard]}
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/modules/core/core.module').then((m) => m.CoreModule),
    data: {role: 'Manager'},
  },
  {path:'404', component:Page404Component},
  {path: '500', component: Page500Component},
   {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
