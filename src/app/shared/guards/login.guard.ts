import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/modules/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this._authService.isAuthenticated;

    // const promise = new Promise((resolve, reject) => {
    //   try {
    //     resolve(true)
    //   } catch (error) {
    //     reject(false)
    //   }
    // });

    // promise.then(resp => {
    // }).catch(error => {

    // })

    // const observable = new Observable(observer => {
    //   observer.next(true);
    // }).pipe(catchError(error => of(false)));

    // observable.subscribe(resp => {
    // })

    if (isAuthenticated && route.routeConfig?.path?.includes('login')) {
      this._router.navigate(['dashboard']);
      return false;
    }

    return true;
  }

}
