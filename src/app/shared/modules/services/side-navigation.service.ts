import { Injectable } from '@angular/core';
import { INavigation } from '../../models/INavigation';

@Injectable({
  providedIn: 'root'
})
export class SideNavigationService {

  constructor() { }

  getMenuItems(): INavigation[] {
    return [{
      label: 'Employee',
      path: '/employee',
      key: '1',
      isActive: false,
      children: [{
        label: 'List',
        path: '/employee/all',
        key: '1',
        isActive: false,
        parentKey: '1'
      }, {
        label: 'Details',
        path: '/employee/details/2',
        key: '2',
        isActive: false,
        parentKey: '1'
      }]
    }, {
      label: 'Staff',
      path: '/staff',
      key: '2',
      isActive: false,
    }]
  }
}
