import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbDateStruct, NgbCalendar,NgbModal, ModalDismissReasons, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { GroupListService } from '../group-list.service';
import { MemberIdService } from '../member-id.service';
import { User } from '../grouplist';
import { givemoney } from './givemoney'

@Component({
  selector: 'app-resister',
  templateUrl: './resister.component.html',
  styleUrls: ['./resister.component.css']
})
export class ResisterComponent implements OnInit {
  datemodel:NgbDate
  userList:User;
  constructor(
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
            }
          )
      }
    }
    selectPlce(obj,obj2){
      this.place=obj;
      this.show = false;
      obj2.value = this.place.place
      console.log(this.place.place)
    }
    show:boolean=true;
    place:any
    
    //userList를 불러오는 장소
  ngOnInit() {
    // this.groupList.postGroupList().subscribe(
    //   res =>{
      
    //     this.userList=res.user_list;
    //     for(let i in this.userList){
    //       if(this.userList[i].group_id==this.memberId.groupNumber){
    //         console.log(this.userList[i])
    //       }
    //     }
    //   }
    // )
  }

  dpsQkd:false;
  totalmoney:number;
  user:User[]=[];
  test(){
    this.groupList.postGroupList().subscribe(
      res =>{
        this.userList=res.user_list;
        for(let i in this.userList){
          if(this.userList[i].group_id==this.memberId.groupNumber){

            let user1 = this.userList[i]
            this.user.push(this.userList[i])
          }
        }
      }
    )
    console.log(this.user)
  }
  givemoney=[]
  dpsQkdgkrl () {
    if(!this.dpsQkd){
      for(let i in this.user){
        let idMoney = new givemoney(this.user[i].member_id,this.user[i].money);
        this.givemoney.push(idMoney);
        console.log(this.givemoney);
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
  }
  total:number=0
  user2:any;
  makeTotalmoney(obj){
    this.total=0
    this.user2 = this.user
    for(let i in this.user){
      if(this.user[i].money == undefined){
        this.user[i].money= ""
      }
      this.total += Number(this.user[i].money)
    }
  }
  
  gmagma(){}
  cnt:number;
  inittotal:number;
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
      for(let i in this.user){
        let idMoney = new givemoney(this.user[i].member_id,this.user[i].money);
        this.givemoney.push(idMoney);
        console.log(this.givemoney);
      }
      for(let i in this.user){
        if(this.user[i].money == undefined){
          this.user[i].money= ""
        }
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
    console.log(this.cnt)
    // this.http.post(this.addUrl,body).subscribe(
    //   res => console.log(res)
    // )
  }
}
