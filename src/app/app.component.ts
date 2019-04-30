import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAuthenticated = false;
  constructor(
    private auth : AuthService
  ){
    this.auth.onAuthorized.subscribe(
      () => {
        this.isAuthenticated = true;
      }
    )
  }
  title = 'last2';
}
