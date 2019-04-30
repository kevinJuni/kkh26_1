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
    private groupList:GroupListService
  ) { 
  }

  test(){
    
  }
  //가져오는 주소 
  url="https://loopay.crontiers.com/api/group_list";
  subuserlist:any;
  subgrouplist:any;
  userlist:User;
  grouplist:Group;
  member_id:number;
  submember_id:any;
  ngOnInit() {
        const body = {
      "group_list":{ 
        "id":"1",
        "limit":30,
        "offset":0
      }
    }
    this.http.post<PaymentList>(this.url,body).subscribe( res => {  
      this.subuserlist=JSON.stringify(res.user_list);
      this.userlist = JSON.parse(this.subuserlist);
      this.subgrouplist = JSON.stringify(res.group_list);
      this.grouplist = JSON.parse(this.subgrouplist);
      this.groupList.grouplist.push(this.grouplist);
      this.groupList.userlist.push(this.userlist);
  })
  }

}
