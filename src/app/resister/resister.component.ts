import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { GroupListService } from '../group-list.service';

@Component({
  selector: 'app-resister',
  templateUrl: './resister.component.html',
  styleUrls: ['./resister.component.css']
})
export class ResisterComponent implements OnInit {
  datemodel;
  userList:any;
  constructor(
    private http:HttpClient,
    private calendar:NgbCalendar,
    private group:GroupListService
  ) { 
    this.userList = this.group.userlist
  }
  loding:any;
  
  
  datetest(){
    console.log(this.datemodel)
  }

  //달력 부분입니다
  selectToday() {
    this.datemodel = this.calendar.getToday();
  }


  //검색 기능입니다
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
    place:any
    selectPlce(obj){
      this.place=obj;
      console.log(this.place.address)
    }
  ngOnInit() {
  }

}
