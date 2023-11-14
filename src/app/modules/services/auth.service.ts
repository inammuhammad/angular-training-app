import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable, delay, map, mergeMap, observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor(
    private _loadingBar: LoadingBarService
  ) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') !== null;
    this.isAuthenticated = isAuthenticated;
  }

  login(): Observable<boolean> {
    this._loadingBar.start();
    const observable = new Observable<boolean>(observer => {
      observer.next(true);
    }).pipe(delay(2500), map(res => {
      this._loadingBar.stop();
      localStorage.setItem('isAuthenticated', 'true');
      this.isAuthenticated = true;
      return res;
    }));

    return observable;
  }

  logout(): Observable<boolean> {
    this._loadingBar.start();
    const observable = new Observable<boolean>(observer => {
      observer.next(true);
    }).pipe(delay(2500), map(res => {
      this._loadingBar.stop();
      localStorage.removeItem('isAuthenticated');
      this.isAuthenticated = false;
      return res;
    }));

    return observable
  }

  getUserDetails(): void {

    // SWITCH MAP
    const observableMoreDetails = new Observable(observer => {
      const secondData = { office: 'Systems', phoneNumber: 1234566 };
      observer.next(secondData);
    });

    const observableBasicDetails = new Observable(observer => {
      const firstData = { userName: 'Inam', firstName: 'Muhammad', lastName: 'Inam Ul Haque' };
      observer.next(firstData);
    }).pipe(switchMap(resp => {
      return observableMoreDetails.pipe(map(secondData => {
        return { secondData, firstData: resp }; // {secondData: {}, firstData: {}}
      }));
    }));

    observableBasicDetails.subscribe(resp => {
    });

    const observable = new Observable(observer => {
      observer.next([{ userId: 1, name: 'Inam' }]);
    }).pipe(mergeMap(resp => {
      const anotherResp: any[] = [];
      anotherResp.push(...resp as []);
      anotherResp.forEach(item => {
        item.lastName = 'Ul Haque';
      });
      return of(anotherResp);
    }))

    observable.subscribe(resp => {
    });
  }
}
