import { Injectable, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { PaymentList, User, Group } from './grouplist';


@Injectable({
  providedIn: 'root'
})
export class GroupListService implements OnInit {
  public grouplist=[];
  public userlist=[];
  constructor( private http:HttpClient
  ) { }
  url="https://loopay.crontiers.com/api/group_list";
  postGroupList(){
    const body = {
      "group_list":{ 
        "id":"1",
        "limit":30,
        "offset":0
      }
    }
    return this.http.post<PaymentList>(this.url, body)
  }
  ngOnInit(){
    
  
  }
}
