import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginIdService } from '../login-id.service';
import { HttpClient } from '@angular/common/http';
import { GroupListService } from '../group-list.service';
import { User } from '../grouplist';
import { Posts, Post } from '../post';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {
  navigationSubscription;
  groupnumber:number;
  kakaoUser:any;
  groupList:any;
  userList:any;
  userList2:User;
  memberId:number;
  memberlist:any;
  readonly url = 'https://loopay.crontiers.com/api/payment_list';
  posts: Observable<Post[]>;
  constructor(
    private kakaoId:LoginIdService,
    private route:ActivatedRoute,
    private router:Router,
    private http:HttpClient,
    private grouplist:GroupListService
  ) { 
    this.groupList = this.grouplist.grouplist;
    this.userList = this.grouplist.userlist;
    this.userList2 = this.userList[0]
    this.kakaoUser=this.kakaoId.kakaoId;
    this.navigationSubscription = this.router.events.subscribe(
      (e:any)=>{
        if( e instanceof NavigationEnd){
          this.initialiseInvites();
        }
     }
    )
  }
  test(){
    console.log(this.userList)
  }
  initialiseInvites(){
    this.route.paramMap.subscribe(
      params => this.groupnumber = +params.get('group_number')
    )
    console.log(this.kakaoUser[0].id)
    for(let i in this.userList[0]){
      if(Number(this.userList[0][i].member.access_token) == Number(this.kakaoUser[0].id)){
        this.memberId = this.userList[0][i].member_id;
        const data = { 
          "payment_list":{
          "id":String(this.memberId),
          "group_id":String(this.groupnumber),
          "limit":30,"offset":0
          }
        }
        this.http.post<Posts>(this.url, data).subscribe(
          res => {
            this.memberlist = res.payment_list
          }
        )
      }
    }
  }
  ngOnInit() {
    
  }

}
