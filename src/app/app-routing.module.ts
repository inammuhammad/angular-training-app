import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHomeComponent } from './modules/components/employee/employee-home/employee-home.component';
import { EmployeeModule } from './modules/components/employee/employee.module';
import { StaffComponent } from './modules/components/staff/staff.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeHomeComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EmployeeModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
