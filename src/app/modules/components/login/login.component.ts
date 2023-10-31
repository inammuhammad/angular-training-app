import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this._authService.login().subscribe(resp => {
      if (resp) {
        this._authService.getUserDetails();
        this._router.navigate(['dashboard']);
      }
    })
  }

}
