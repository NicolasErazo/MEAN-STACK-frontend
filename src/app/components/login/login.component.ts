import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin!: FormGroup;
  formRegister!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.buildFormRegister();
    this.buildFormLogin();
  }

  private buildFormLogin() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private buildFormRegister() {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginUser(event: Event) {
    this.authService.login(this.formLogin.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/employees']);
      },
      err => {
        console.log(err);
      }
    )
  }

  registerUser(event: Event) {
    if (this.formRegister.get('password1')?.value == this.formRegister.get('password2')?.value) {
      this.authService.register(this.formRegister.value).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/employees']);
        },
        err => {
          console.log(err);
        }
      )
    } else {
      return console.log('Password Not Match');
    }

  }

  isRegisterRoute() {
    return this.router.url === '/register';
  }

  isLoginRoute() {
    return this.router.url === '/login';
  }
}
