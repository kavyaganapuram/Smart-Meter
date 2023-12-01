import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-industry-dashboard',
  templateUrl: './industry-dashboard.component.html',
  styleUrls: ['./industry-dashboard.component.css'],
})
export class IndustryDashboardComponent implements OnInit {
powerreadings: any;
  constructor(public nav: NavigationService,public http:HttpClient){}
  ngOnInit(): void {

  }

  power: any;
  AbsoluteMachinepower: any;
  EstimationMachinepower: any;
  Condition: boolean = false;
  Data:any [] =[];
  Readings:any[]=[];

  onSubmit() {
    this.EstimationMachinepower=this.powerreadings;
  }

  RetriveData(){
    this.http
      .get<any>(
        'https://api.thingspeak.com/channels/2231908/feeds.json?api_key=CR7GNXMBV7ZY2JKK&results=10'
      )
      .subscribe((data: { feeds: any[] }) => {
        this.processThingSpeakData(data.feeds);

      });
  }

  processThingSpeakData(feeds: any[]) {

    this.Data = feeds.map((feed) => ({
      powerreadings: parseFloat(feed.field1),

    }));
    this.power=this.Data[0]?.powerreadings;
    this.Readings.push(this.power);
 
}


scheduleDataRetrieval() {
  const dailyMilliseconds =    5 * 1000; 
  const targetTime = new Date();
  targetTime.setHours(0, 1, 0, 0);

  const initialDelay = targetTime.getTime() - Date.now();
  if (initialDelay < 0) {
    targetTime.setTime(targetTime.getTime() + dailyMilliseconds);
  }

  interval(dailyMilliseconds)
    .pipe(
      startWith(initialDelay),
      switchMap(() => {
        this.RetriveData();
        return interval(dailyMilliseconds); 
      })
    )
    .subscribe();
}

ScheduleDataRetrieval() {
  const dailyMilliseconds =    60*60 * 1000; 
  const targetTime = new Date();
  targetTime.setHours(0, 1, 0, 0); 

  const initialDelay = targetTime.getTime() - Date.now();
  if (initialDelay < 0) {

    targetTime.setTime(targetTime.getTime() + dailyMilliseconds);
  }

  interval(dailyMilliseconds)
    .pipe(
      startWith(initialDelay),
      switchMap(() => {
        this.condition();
        return interval(dailyMilliseconds); 
      })
    )
    .subscribe();
}

condition(){
  let len = this.Readings.length;
  let sum = this.Readings.reduce((acc,val)=>acc+val,0);
  let average = sum/len;
  if(average>=this.powerreadings+2){
    this.Condition=false;
  }
  else{
    this.Condition=true;
  }
}


}
