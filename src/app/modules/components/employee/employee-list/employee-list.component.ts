import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, IEmployee } from '../services/employee.service';
import { Subscription, catchError, combineLatest, interval, map, of } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  title = 'Employee Listing'
  employees: { name: string, id: number }[] = [];
  page: number = 1;
  pageSize: number = 10;

  private _subscriptions: Subscription[] = [];
  private _intervalSubcription: Subscription | undefined = undefined;

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _employeeService: EmployeeService
  ) {
    // debugger;
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
    this._intervalSubcription?.unsubscribe();
  }

  ngOnInit(): void {
    this._subscriptions.push(
      combineLatest([
        this._activatedRoute.queryParams,
        this._activatedRoute.params,
        this._activatedRoute.data
      ]).subscribe(resp => {
        const pageSize = resp[0]?.['page_size'];
        this.getEmployees(pageSize);
      })
    )

    const employee: IEmployee = {
      id: 20,
      email: 'abc@domain.com',
      first_name: 'Abc',
      last_name: 'Xyz',
    }

    this._subscriptions.push(
      combineLatest([
        this._employeeService.list(),
        this._employeeService.listNew().pipe(catchError(error => {
          debugger;
          return of({});
        }))
      ]).pipe(map(resp => {
        debugger;
        return resp
      }), catchError(error => {
        debugger;
        return of();
      })).subscribe(resp => {
        debugger;
      })
    )

    // this._intervalSubcription =
    //   interval(2000).subscribe(resp => {
    //     debugger;
    //   })
    // );
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

  private getEmployees(pageSize = 50): void {
    this._employeeService.list(pageSize).subscribe(resp => {
      this.employees = resp.map(m => {
        const employee = { name: `${m.first_name} ${m.last_name}`, id: m.id };
        return employee;
      })
    });
  }

}
