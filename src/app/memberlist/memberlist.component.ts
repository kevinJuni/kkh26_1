import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginIdService } from '../login-id.service';
import { HttpClient } from '@angular/common/http';
import { GroupListService } from '../group-list.service';
import { User } from '../grouplist';
import { Posts, Post } from '../post';
import { Observable } from 'rxjs';
import { MemberIdService } from '../member-id.service';
import { NgbActiveModal,NgbModal, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { givemoney } from '../resister/givemoney';

@Component({
  selector: 'ngbd-modal-content',
  template: `

<input type="text" #input (keyup)="showPlaceList(input)">
<ul *ngIf="show">
  <li *ngFor = "let native_list of native_place" (click)="selectPlce(native_list,input)">
    {{native_list.place}}
  </li>
</ul>
<ul *ngIf="show">
  <li *ngFor = "let external_list of external_place" (click)="selectPlce(external_list,input)">
    {{external_list.place}}
  </li>
</ul>


<form class="form-inline">
    <div class="form-group">
      <div class="input-group">
        <input class="form-control" placeholder="yyyy-mm-dd"
               name="dp" [(ngModel)]="datemodel"  ngbDatepicker #d="ngbDatepicker">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary calendar" (click)="d.toggle()" type="button"></button>
  
          <button class="btn btn-sm btn-outline-primary mr-2" (click)="selectToday()">Select Today</button>
  
        </div>
      </div>
    </div>
  </form>
  <hr/>
  <span>N분의1</span><input type="checkbox" [(ngModel)]="dpsQkd">
  <div *ngIf="!dpsQkd">
  <ul>
    <li *ngFor="let i of user">
      {{i.member.name}}
      <input type="number" (keyup)="makeTotalmoney($event)" [(ngModel)]="i.money" placeholder="0">
    </li>
    <h1>total : <span>{{total}}</span></h1>
  </ul>
</div>
<div *ngIf="dpsQkd">
  <h1>
    total: <input type="text" [(ngModel)]="total" placeholder="0">
  </h1>
  <li *ngFor="let i of user">
    {{i.member.name}}
    <input type="checkbox" [(ngModel)]="i.check">
  </li>
</div>
  <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click') || addPayment()">전송하기</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;


  datemodel:NgbDate
  userList:any;
  dpsQkd: any;
  total: any = "";
  constructor(
    public activeModal: NgbActiveModal,
    private memberId:MemberIdService,
    private http:HttpClient,
    private calendar:NgbCalendar,
    private groupList:GroupListService,
    private modalService: NgbModal
  ) { 
  }
  loding:any;
  memberid:number;
  year:number;
  month:number;
  day:number;
  today:any;
  datetest(){
    console.log(this.memberId.groupNumber)
  }

  //달력 부분입니다//////////////////////////////////////////////////////////
  selectToday() {
    this.datemodel = this.calendar.getToday();
  }


  //검색 기능입니다///////////////////////////////////////////////////////////////
  model:string;
  external_place:any;
  native_place:[];

  body = {
    "query": this.model,
    "req_seq": 1,
    "id": 0
  }

  palce_url = "https://loopay.crontiers.com/api/place_finder"
    showPlaceList(input){
      this.show=true;
      if(input.value.length > 1){
        let body = {
          "query": input.value,
          "req_seq": 1,
          "id": 0
        }
          this.http.post(this.palce_url, body).subscribe(
            res=>{
              this.external_place = res["external_place"];
              this.native_place = res["native_place"];
              if(this.external_place.length === 1){
                this.external_place[0]={"place":"검색중"}
                console.log(123123123123)
              }
                console.log(this.external_place)
                console.log(this.native_place)
              
              
            }
          )
      }
    }
    show:boolean=true;
    place:any
    selectPlce(obj,obj2){
      this.place=obj;
      this.show = false;
      obj2.value = this.place.place
      console.log(this.place.place)
    }
    //userList를 불러오는 장소
  user:User[]=[];
  ngOnInit() {
    this.groupList.postGroupList().subscribe(
      res =>{
        this.userList=res.user_list;
        for(let i in this.userList){
          if(this.userList[i].group_id==this.memberId.groupNumber){
            let user1 = this.userList[i];
            this.user.push(this.userList[i])
          }
        }
      }
    )
  }
  makeTotalmoney(obj){
    this.total=0
    for(let i in this.user){
      if(this.user[i].money == undefined){
        this.user[i].money= ""
      }
      this.total += Number(this.user[i].money)
    }
  }
  cnt:number;
  inittotal:number;
  givemoney=[]
 closeResult: string;
addUrl="https://loopay.crontiers.com/api/add_payment"
//금액을 전송하는 부분입니다//////////////////////////////////////////////////////
  addPayment(){
    
    this.year = this.datemodel.year;
    this.month = this.datemodel.month;
    this.day = this.datemodel.day;
    this.today = [this.year,this.month,this.day].join("-0") + " 13:00:00";
    this.memberid = this.memberId.memberId;
    if(!this.dpsQkd){
      this.total=0
      for(let i in this.user){
        if(this.user[i].money){
        let idMoney = new givemoney(this.user[i].member_id,this.user[i].money);
        this.givemoney.push(idMoney);
      }
      }
      for(let i in this.user){
        if(this.user[i].money == undefined){
          this.user[i].money= ""
        }
        console.log(this.total)
        this.total += Number(this.user[i].money)
      }
    
    }else{
      this.cnt = 0;
      console.log(123123)
      for(let i in this.user){
        if(this.user[i].check === true){
          this.cnt++
        }
      }
      this.inittotal = this.total/this.cnt
      for(let i in this.user){
        if(this.user[i].check === true){
          let idMoney = new givemoney(this.user[i].member_id,this.inittotal);
          this.givemoney.push(idMoney);
        }
      }
    }
    
    const body={
      "group_id": String(this.memberId.groupNumber),  //group 
      "calculator_id": this.memberid,  //member Id
      "total_money": this.total,
      "place": this.place.place,
      "category": this.place.category,
      "description": "없음",
      "telephone": this.place.telephone,
      "address": this.place.address,
      "roadaddress": "서울특별시 강남구 강남대로 452 대연빌딩 1층",
      "mapx": this.place.mapx,
      "mapy": this.place.mapy,
      "map_comment": "naver",
      "add_payment": this.givemoney,
      "pay_type": 2,
      "date_time":this.today//"2019-04-29 13:00:00"
    }
    console.log(body)
    this.http.post(this.addUrl,body).subscribe(
      res => console.log(res)
    )
  }
  
}

////////////////////////////////////********************** *///////
@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
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
  navigationSubscription;
  groupnumber:number;
  kakaoUser:any;
  userList2:User;
  memberId:number;
  memberlist:any;
  readonly url = 'https://loopay.crontiers.com/api/payment_list';
  posts: Observable<Post[]>;
  constructor(
    private modalService: NgbModal,
    private memberNumber:MemberIdService,
    private kakaoId:LoginIdService,
    private route:ActivatedRoute,
    private router:Router,
    private http:HttpClient,
    private grouplist:GroupListService
  ) { 
   
    this.kakaoUser=this.kakaoId.kakaoId;
    this.navigationSubscription = this.router.events.subscribe(
      (e:any)=>{
        if( e instanceof NavigationEnd){
          this.initialiseInvites();
        }
     }
    )
  }

  
  


  initialiseInvites(){
    this.route.paramMap.subscribe(
      params => this.groupnumber = +params.get('group_number')
    )
    this.grouplist.postGroupList().subscribe(
      res => {
            this.groupList = res.group_list
            this.userList = res.user_list
            for (let i in this.userList){
              if(Number(this.userList[i].member.access_token)==Number(this.kakaoUser[0].id)){
               this.memberId = this.userList[i].member_id;
               this.memberNumber.memberId=this.memberId;
               this.memberNumber.groupNumber=this.groupnumber
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
    )
  
      

  }
}
