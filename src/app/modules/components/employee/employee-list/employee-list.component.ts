import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  title = 'Employee Listing'
  employees = [{
    name: 'Employee 1',
    id: 1
  }, {
    name: 'Employee 2',
    id: 2
  }, {
    name: 'Employee 3',
    id: 3
  }]

  constructor(
    private _route: Router
  ) { }

  ngOnInit(): void {
  }

  gotoDetail(id: number): void {
    this._route.navigate([`/employee/details/${id}`])
  }

}
