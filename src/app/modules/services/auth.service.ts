import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor() { }

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
}
