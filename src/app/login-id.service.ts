import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginIdService {
  public kakaoId = [];
  public http:HttpClient;
  constructor() { }
}
