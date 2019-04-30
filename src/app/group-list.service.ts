import { Injectable, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { PaymentList, User, Group } from './grouplist';


@Injectable({
  providedIn: 'root'
})
export class GroupListService implements OnInit {
  public grouplist=[];
  public userlist=[];
  constructor(
  ) { }

  ngOnInit(){
    
  
  }
}
