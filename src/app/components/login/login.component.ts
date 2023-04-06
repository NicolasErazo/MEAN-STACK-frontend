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
      password: ['', [Validators.required, Validators.minLength(8)]],
      agree: [false, [Validators.requiredTrue]]
    });
  }

  loginUser(event: Event): void {
    if (this.formLogin.valid) {
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
    else {
      this.formLogin.markAllAsTouched();
    }
  }

  registerUser(event: Event) {
    if (this.formRegister.valid) {
      this.authService.register(this.formRegister.value).subscribe(
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
          console.log(err);
        }
      )
    } else {
      this.formRegister.markAllAsTouched();
    }

  }

  isRegisterRoute() {
    return this.router.url === '/register';
  }

  isLoginRoute() {
    return this.router.url === '/login';
  }

  // Login

  get emailField() {
    return this.formLogin.get('email');
  }

  get isEmailFieldValid() {
    return this.emailField?.touched && this.emailField.valid;
  }

  get isEmailFieldInvalid() {
    return this.emailField?.touched && this.emailField.invalid;
  }

  get passwordField() {
    return this.formLogin.get('password');
  }

  get isPasswordFieldValid() {
    return this.passwordField?.touched && this.passwordField.valid;
  }

  get isPasswordFieldInvalid() {
    return this.passwordField?.touched && this.passwordField.invalid;
  }

  //Register

  get nameFieldRegister() {
    return this.formRegister.get('name');
  }

  get isNameFieldRegisterValid() {
    return this.nameFieldRegister?.touched && this.nameFieldRegister.valid;
  }

  get isNameFieldRegisterInvalid() {
    return this.nameFieldRegister?.touched && this.nameFieldRegister.invalid;
  }

  get usernameFieldRegister() {
    return this.formRegister.get('username');
  }

  get isUsernameFieldRegisterValid() {
    return this.usernameFieldRegister?.touched && this.usernameFieldRegister.valid;
  }

  get isUsernameFieldRegisterInvalid() {
    return this.usernameFieldRegister?.touched && this.usernameFieldRegister.invalid;
  }

  get emailFieldRegister() {
    return this.formRegister.get('email');
  }

  get isEmailFieldRegisterValid() {
    return this.emailFieldRegister?.touched && this.emailFieldRegister.valid;
  }

  get isEmailFieldRegisterInvalid() {
    return this.emailFieldRegister?.touched && this.emailFieldRegister.invalid;
  }

  get passwordFieldRegister() {
    return this.formRegister.get('password');
  }

  get isPasswordFieldRegisterValid() {
    return this.passwordFieldRegister?.touched && this.passwordFieldRegister.valid;
  }

  get isPasswordFieldRegisterInvalid() {
    return this.passwordFieldRegister?.touched && this.passwordFieldRegister.invalid;
  }

  get agreeFieldRegister() {
    return this.formRegister.get('agree');
  }

  get isAgreeFieldRegisterValid() {
    return this.agreeFieldRegister?.touched && this.agreeFieldRegister.valid;
  }

  get isAgreeFieldRegisterInvalid() {
    return this.agreeFieldRegister?.touched && this.agreeFieldRegister.invalid;
  }
}
