import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHomeComponent } from './modules/components/employee/employee-home/employee-home.component';
//  DSIABLE FOR LAZY LOADING
import { EmployeeModule } from './modules/components/employee/employee.module';

const routes: Routes = [
  {
    path: 'employee',
    //  ENABLE FOR LAZY LOADING
    // loadChildren: () => import('./modules/components/employee/employee.module').then(m => m.EmployeeModule)
    //  DSIABLE FOR LAZY LOADING
    component: EmployeeHomeComponent
  },
  {
    path: 'staff',
    loadChildren: () => import('./modules/components/staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    //  DSIABLE FOR LAZY LOADING
    EmployeeModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
