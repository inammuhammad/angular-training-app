import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup | null = null;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('', Validators.minLength(2)),
      confirmpassword: new FormControl('', Validators.minLength(2))
    }, {
      validators: this.passwordMatch
    })
  }

  private passwordMatch(formGroup: FormGroup): { 'mismatch': boolean } | null {
    debugger;
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmpassword');
    const isValid = password?.value === confirmPassword?.value;
    return isValid ? null : { 'mismatch': true };
  }

  onLogin(): void {
    debugger;
    const { username, password } = this.form?.value;
    this._authService.login().subscribe(resp => {
      if (resp) {
        this._authService.getUserDetails();
        this._router.navigate(['dashboard']);
      }
    })
  }


}
