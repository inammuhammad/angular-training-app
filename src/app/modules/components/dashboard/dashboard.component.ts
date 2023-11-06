import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  empStats: number[] = [];
  empStats$: Observable<number[]> = of([]);

  constructor(
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this._dashboardService.emps.subscribe(empList => {
      this.empStats = empList;
    })

    // this._dashboardService.getEmployeeStats().subscribe(resp => {
    //   this.empStats = resp;
    // });

    // this.empStats$ = this._dashboardService.emps;
  }


  addEmp(): void {
    this._dashboardService.setEmps(this.empStats.length + 1);
    // this.empStats$.subscribe((resp) => {
    //   this._dashboardService.setEmps(resp.length + 1);
    // })
    // this._dashboardService.emps = [...this._dashboardService.emps, this._dashboardService.emps.length + 1]
    // this.empStats$ = this._dashboardService.getEmployeeStats();
  }

}
