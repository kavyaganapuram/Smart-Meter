import { Component } from '@angular/core';
import { LimitService } from '../limit.service';

@Component({
  selector: 'app-set-limits',
  templateUrl: './set-limits.component.html',
  styleUrls: ['./set-limits.component.css']
})
export class SetLimitsComponent {

constructor(private limit:LimitService){}
  yourMonthlyBudget: number = 0;
  yourMonthlyUnits:number=0;

  x:number=0;

  onSubmit() {
    let x=0,m=0,l=0,h=0,mid=0,u=0;
    x=this.yourMonthlyBudget;

    if(x<0){
      console.log("Please Enter valid amount....");
  }
  else if(x<=8490) {
      if (x == 97.5) {
          u = 50;
      } else if (x == 252.5) {
          u = 100;
      } else if (x == 820) {
          u = 200;
      } else if (x == 1790) {
          u = 300;
      } else if (x == 2690) {
          u = 400;
      } else if (x == 6490) {
          u = 800;
      } else if (x == 8490) {
          u = 1000;
      } else if (x < 97.5) {
          mid = x / 1.95;
      } else if (97.5 < x && x < 252.5) {
          l = 50;
          h = 100;
          while (Math.abs(x - m) > 5) {
              mid = ((l + h) / 2);
              m = 97.5 + (mid - 50) * 3.10;
              if (x > m) {
                  l = mid;
              } else {
                  h = mid;
              }
          }
      } else if (252.5 < x && 340 > x) {
          mid = 100;
//                if((x-252.5)>(340-x))
//                    mid=200;
      } else if (340 < x && x < 820) {
          l = 100;
          h = 200;
          while (Math.abs(x - m) > 10) {
              mid = ((l + h) / 2);
              m = 340 + (mid - 100) * 4.80;
              if (x > m) {
                  l = mid;
              } else {
                  h = mid;
              }
          }
      } else if (820 < x && 1020 > x) {
          mid = 200;
//                if((x-820)>(1020-x))
//                    mid=300;
      } else if (1020 < x && x < 1790) {
          l = 200;
          h = 300;
          while (Math.abs(x - m) > 10) {
              mid = ((l + h) / 2);
              m = 1020 + (mid - 200) * 7.70;
              if (x > m) {
                  l = mid;
              } else {
                  h = mid;
              }
          }
      } else if (1790 < x && x < 2690) {
          l = 300;
          h = 400;
          while (Math.abs(x - m) > 10) {
              mid = ((l + h) / 2);
              m = 1790 + (mid - 300) * 9.00;
              if (x > m) {
                  l = mid;
              } else {
                  h = mid;
              }
          }
      } else if (2690 < x && x < 6490) {
          l = 400;
          h = 800;
          while (Math.abs(x - m) > 10) {
              mid = ((l + h) / 2);
              m = 2690 + (mid - 400) * 9.50;
              if (x > m) {
                  l = mid;
              } else {
                  h = mid;
              }
          }
      } else if (6490 < x && x < 8490) {
          l = 800;
          h = 1000;
          while (Math.abs(x - m) > 10) {
              mid = ((l + h) / 2);
              m = 6490 + (mid - 800) * 10.00;
              if (x > m) {
                  l = mid;
              } else {
                  h = mid;
              }
          }
      }
      u = mid;
      console.log("you can consume up to  ",u)
      this.yourMonthlyUnits=u;

      this.sendvalue(u);
  }

 
}
sendvalue(value:number){
    this.limit.yourMonthlyLimits=value;
    
}

}