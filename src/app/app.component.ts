import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseApp } from '@angular/fire/compat';
import { GoogleAuthProvider } from '@firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private firebase: FirebaseApp){}

  logout(){
    this.authService.logout();
  }

  user(){
    return this.authService.loggedIn();
  }

}
