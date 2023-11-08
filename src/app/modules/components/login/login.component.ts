import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  date: Date | null = null;
  numberValue = 3;
  power = 1;
  updatedNumberValue = 0;

  form: FormGroup | null = null;

  @ViewChild('loginForm') loginForm: ElementRef | undefined;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.date = new Date(2001, 0, 1);



    this.form = this._formBuilder.group({
      username: new FormControl('',
        [
          Validators.required
        ]),
      password: new FormControl('',
        // Validators.minLength(2),
        [
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          )
        ]
      ),
      confirmpassword: new FormControl('',
        // Validators.minLength(2),
        [
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          ),
          // this.passwordMatch
        ]
      )
    }, {
      validators: this.passwordMatch
    })

    // this.form.addValidators(validator => {
    //   validator.c
    //   return this.passwordMatch
    // })
  }

  onLogin(): void {
    const { username, password } = this.form?.value;
    if (this.form?.valid) {
      this._authService.login().subscribe(resp => {
        if (resp) {
          this._authService.getUserDetails();
          this._router.navigate(['dashboard'], { skipLocationChange: true, replaceUrl: false });
        }
      })
    }
  }

  patchValues(): void {
    const values = { username: 'minamulhaque', password: 'Zxcv@12' };
    if (this.form) {
      this.form.patchValue(values);
    }
  }

  private passwordMatch(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmpassword');
    const isValid = password?.value === confirmPassword?.value;
    return isValid ? null : { 'mismatch': true };
  }

  ngOnDestroy(): void {

  }

}
