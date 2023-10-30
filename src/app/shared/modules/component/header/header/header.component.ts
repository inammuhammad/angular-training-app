import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout().subscribe(resp => {
      this._router.navigate(['']);
    });
  }

}
