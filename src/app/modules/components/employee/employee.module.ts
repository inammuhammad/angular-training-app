import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HighlightDirective } from 'src/app/directives/highlight.directive';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeHomeComponent,
    EmployeeDetailsComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    EmployeeRoutingModule
  ],
})
export class EmployeeModule { }
