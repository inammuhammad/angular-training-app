import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';

const routes: Routes = [
  //  ENABLE FOR LAZY LOADING
  {
    path: '',
    component: EmployeeHomeComponent,
    children: [
      {
        path: 'all',
        component: EmployeeListComponent
      },
      {
        path: 'new',
        component: EmployeeCreateComponent
      },
      {
        path: 'details/:id',
        component: EmployeeDetailsComponent
      }
    ]
  },
  //  DISABLE FOR LAZY LOADING
  // {
  //   path: 'employee/all',
  //   component: EmployeeListComponent
  // },
  // {
  //   path: 'employee/details/:id',
  //   component: EmployeeDetailsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
