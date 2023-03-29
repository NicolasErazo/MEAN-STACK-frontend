import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {}

  isRegisterRoute() {
    return this.router.url === '/register';
  }

  isLoginRoute() {
    return this.router.url === '/login';
  }
}
