import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from './modules/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  constructor(
    // private _loadingBar: LoadingBarService
    private _authService: AuthService
  ) { }

  get isAuthenticated(): boolean {
    return this._authService.isAuthenticated;
  }

  // startLoading() {
  //   this._loadingBar.start();
  // }

  // stopLoading() {
  //   this._loadingBar.complete();
  // }
}
