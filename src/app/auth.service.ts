import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  onAuthorized = new EventEmitter();

  token = '';

  constructor() { }

  authorized (token: string) {
    this.token;

    this.onAuthorized.emit();
  }
}