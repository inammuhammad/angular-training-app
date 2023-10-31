import { Injectable } from '@angular/core';
import { Observable, delay, map, mergeMap, observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') !== null;
    this.isAuthenticated = isAuthenticated;
  }

  login(): Observable<boolean> {
    const observable = new Observable<boolean>(observer => {
      localStorage.setItem('isAuthenticated', 'true');
      this.isAuthenticated = true;
      observer.next(true);
    }).pipe(delay(2500));

    return observable;
  }

  logout(): Observable<boolean> {
    const observable = new Observable<boolean>(observer => {
      localStorage.removeItem('isAuthenticated');
      this.isAuthenticated = false;
      observer.next(true);
    }).pipe(delay(2500));

    return observable
  }

  getUserDetails(): void {
    debugger;

    // SWITCH MAP
    const observableMoreDetails = new Observable(observer => {
      debugger;
      const secondData = { office: 'Systems', phoneNumber: 1234566 };
      observer.next(secondData);
    });

    const observableBasicDetails = new Observable(observer => {
      const firstData = { userName: 'Inam', firstName: 'Muhammad', lastName: 'Inam Ul Haque' };
      observer.next(firstData);
    }).pipe(switchMap(resp => {
      return observableMoreDetails.pipe(map(secondData => {
        debugger;
        return { secondData, firstData: resp }; // {secondData: {}, firstData: {}}
      }));
    }));

    observableBasicDetails.subscribe(resp => {
      debugger;
    });

    const observable = new Observable(observer => {
      observer.next([{ userId: 1, name: 'Inam' }]);
    }).pipe(mergeMap(resp => {
      debugger;
      const anotherResp: any[] = [];
      anotherResp.push(...resp as []);
      anotherResp.forEach(item => {
        item.lastName = 'Ul Haque';
      });
      return of(anotherResp);
    }))

    observable.subscribe(resp => {
      debugger;
    });
  }
}
