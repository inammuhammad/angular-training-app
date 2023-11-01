import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './modules/components/login/login.component';
import { LoginGuard } from './shared/guards/login.guard';
import { LoginModule } from './modules/components/login/login.module';
// import { EmployeeHomeComponent } from './modules/components/employee/employee-home/employee-home.component';
//  DSIABLE FOR LAZY LOADING
// import { EmployeeModule } from './modules/components/employee/employee.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'employee',
    //  ENABLE FOR LAZY LOADING
    loadChildren: () => import('./modules/components/employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [AuthGuard]
    //  DSIABLE FOR LAZY LOADING
    // component: EmployeeHomeComponent
  },
  {
    path: 'staff',
    loadChildren: () => import('./modules/components/staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginModule
    //  DSIABLE FOR LAZY LOADING
    // EmployeeModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
