import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL_API = 'https://api-rest-nodejs-fi7s.onrender.com';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: any) {
    return this.http.post<any>(this.URL_API + '/login', user);
  }

  register(user: any) {
    return this.http.post<any>(this.URL_API + '/register', user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(){
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

  getToken(){
    return localStorage.getItem('token');
  }

}
