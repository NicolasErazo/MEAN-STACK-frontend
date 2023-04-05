import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  private buildFormRegister() {
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  loginUser(event: Event) {
    this.authService.login(this.formLogin.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/employees']);
        Swal.fire({
          title: "¡Welcome!",
          width: 400,
          padding: '3em',
          color: '#716add',
          position: 'center',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
        })
      },
      err => {
        if (err.status == 401) {
          Swal.fire({
            title: "¡Invalid username or password!",
            width: 400,
            padding: '3em',
            color: '#716add',
            position: 'center',
            icon: 'error',
            showConfirmButton: false,
            timer: 1000,
          })
        }
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
