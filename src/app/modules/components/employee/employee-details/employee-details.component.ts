import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  title = 'Employee Details';
  employees: { name: string, id: number, child?: { id: number }[] }[] = [{
    name: 'Employee 1',
    id: 1,
    child: [{
      id: 11
    }, {
      id: 12
    }, {
      id: 13
    }]
  }, {
    name: 'Employee 2',
    id: 2
  }, {
    name: 'Employee 3',
    id: 3
  }];

  employee: { name: string, id: number, child?: { id: number }[] } | undefined = undefined;

  constructor(
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    debugger;
    const employeeId = Number(this._activeRoute?.snapshot?.params?.['id'] || '0');
    this.employee = this.employees.find(f => f.id === employeeId);
  }

  onEmployeeClick(id: number): void {
    debugger;
    window.alert(`Employee ${id} clicked`);
  }

}