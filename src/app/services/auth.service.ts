import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL_API = 'http://localhost:4000';

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
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
