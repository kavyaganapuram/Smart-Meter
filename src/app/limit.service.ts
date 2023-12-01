import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LimitService implements OnInit{
  ngOnInit(): void {
      
  }
  constructor() { }
  
  yourMonthlyLimits:number=0;
  public setValue(value:number){
    this.yourMonthlyLimits=value;
  }
  }


