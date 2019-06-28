import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupListService } from 'src/app/group-list.service';
import { PaymentList, User, Group } from '../grouplist';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private grouplist:GroupListService
  ) { 
  }
  test(){
    console.log(this.userList)
  }

  groupList:any;
  userList:any;

  ngOnInit() {
       
    this.grouplist.postGroupList().subscribe(
      res => {
            this.groupList = res.group_list
            this.userList = res.user_list
            } 
    )
  }
}
