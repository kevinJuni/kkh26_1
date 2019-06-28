import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberIdService {
  public memberId:number;
  public groupNumber:number
  constructor() { }
}
