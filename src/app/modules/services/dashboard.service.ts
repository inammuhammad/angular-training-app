import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _emps$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  setEmps(value: number): void {
    const values = [...this._emps$.value.filter(f => f), value];
    this._emps$.next(values);
  }

  get emps(): Observable<number[]> {
    return this._emps$.asObservable();
  }

  constructor() {
    this.setEmps(1)
    this.setEmps(2)
    this.setEmps(3)
  }
}
