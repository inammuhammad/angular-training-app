import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, IEmployee } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  title = 'Employee Listing'
  employees: { name: string, id: number }[] = [];

  constructor(
    private _route: Router,
    private _employeeService: EmployeeService
  ) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  gotoDetail(id: number): void {
    this._route.navigate([`/employee/details/${id}`], { skipLocationChange: true, replaceUrl: false })
  }

  onCreateEmployee() {
    const employee: IEmployee = {
      id: 20,
      email: 'abc@domain.com',
      first_name: 'Abc',
      last_name: 'Xyz',
    }

    this._employeeService.create(employee).subscribe(resp => {
      if (resp) {
        this.getEmployees();
      }
    });
  }

  onDeleteEmployee(value: number): void {
    this._employeeService.delete(value).subscribe(resp => {
      if (resp) {
        this.getEmployees();
      }
    });
  }

  private getEmployees(): void {
    this._employeeService.list().subscribe(resp => {
      this.employees = resp.map(m => {
        const employee = { name: `${m.first_name} ${m.last_name}`, id: m.id };
        return employee;
      })
    });
  }

}
