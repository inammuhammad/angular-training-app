import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { StaffListingComponent } from './staff-listing/staff-listing.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';


@NgModule({
  declarations: [
    StaffComponent,
    StaffListingComponent,
    StaffDetailsComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }
