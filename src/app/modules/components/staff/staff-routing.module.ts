import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffListingComponent } from './staff-listing/staff-listing.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: 'all',
        component: StaffListingComponent
      },
      {
        path: 'details/:id',
        component: StaffDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
