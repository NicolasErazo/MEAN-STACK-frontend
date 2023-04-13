import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL_API = 'https://api-rest-nodejs-fi7s.onrender.com';

  constructor(private http: HttpClient, private router: Router, public afAuth: AngularFireAuth,) { }

  login(user: any) {
    return this.http.post<any>(this.URL_API + '/login', user);
  }

  register(user: any) {
    return this.http.post<any>(this.URL_API + '/register', user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
    Swal.fire({
      title: "¡See you soon!",
      width: 400,
      padding: '3em',
      color: '#716add',
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(async (result) => {
        console.log('You have been successfully logged in!', result.credential);
        const user = result.user;
        if (user) {
          const token = await user.getIdToken();
          localStorage.setItem('token', token);
          this.router.navigate(['/employees']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
