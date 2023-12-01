import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CurrentBillService {
  Data: any[]=[];
  UnitsData:any []=[];
  UnitsAtThisInstant:number=0;
  MonthlyUnits:any[]=[];
  MonthUnits:number=0;
  MonthlyCurrentBill:number=0.00;
  UptoTodayUnits:number=0;
  UptoTodayBill:number=0;
  CurrentBill:number=0;
  input:number=0;
  temp:number=0;
  temp1 : number =0;temp2 : number =0;temp3 : number =0;temp4 : number =0;temp5 : number =0;
  output:number=0;
  Final_output:number=0;
  DC_CATA : number=5.52;
  FC_CATA : number=30;
  DC_CATB : number=11.1;
  FC_CATB : number=50;
  DC_CATC : number=63.72;
  FC_CATC : number=80;
  


  constructor(public http: HttpClient) {
    this.scheduleDataRetrieval();
    this.ScheduleDataRetrieval();
  }


  ScheduleDataRetrieval() {
    interval(3600000) // 1 hour in milliseconds
      .pipe(
        switchMap(async () => this.RetriveUnitsData())
      )
      .subscribe(
        () => {
          console.log('Retrived Units Data');
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  scheduleDataRetrieval() {
    const dailyMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const targetTime = new Date();
    targetTime.setHours(0, 1, 0, 0); // 00:01:00

    const initialDelay = targetTime.getTime() - Date.now();
    if (initialDelay < 0) {
      // If the target time has already passed for today, schedule for the next day
      targetTime.setTime(targetTime.getTime() + dailyMilliseconds);
    }

    interval(dailyMilliseconds)
      .pipe(
        startWith(initialDelay),
        switchMap(() => {
          this.RetriveData();
          this.MonthlyUnits.push(this.Data[1]?.Units)
          this.UptoTodayUnits=this.MonthlyUnits.reduce((acc,val)=>acc+val,0);
          this.Bill(this.UptoTodayUnits);
          this.UptoTodayBill=this.CurrentBill;
          if (this.isToday30th()) {
            this.MonthUnits =this.MonthlyUnits.reduce((acc,val)=>acc+val,0);
            this.Bill(this.MonthUnits);
            this.MonthlyCurrentBill=this.CurrentBill;
          }
          return interval(dailyMilliseconds); // Trigger subsequent calls at the same interval
        })
      )
      .subscribe();
  }


  RetriveData(){
    this.http
      .get<any>(
        'https://api.thingspeak.com/channels/2231908/feeds.json?api_key=CR7GNXMBV7ZY2JKK&results=10'
      )
      .subscribe((data: { feeds: any[] }) => {
        this.processThingSpeakData(data.feeds);
        this.processThingSpeakDataUnits(data.feeds);
      });
  }

  RetriveUnitsData(){
    this.http
      .get<any>(
        'https://api.thingspeak.com/channels/2231908/feeds.json?api_key=CR7GNXMBV7ZY2JKK&results=10'
      )
      .subscribe((data: { feeds: any[] }) => {
        this.processThingSpeakDataUnits(data.feeds);
      });
  }
  processThingSpeakDataUnits(feeds:any[]){
    this.UnitsData =feeds.map((feed)=>({
      UnitsAtThisInstant:parseFloat(feed.field7),
    }));
  }

  processThingSpeakData(feeds: any[]) {
    // Process and categorize dustbins based on depth
    this.Data = feeds.map((feed) => ({
      Units: parseFloat(feed.field5),
      error: parseFloat(feed.field6),

    }));

    
    this.input=this.Data[1]?.Units;
    if (this.input !== undefined) {
      this.MonthlyUnits.push(this.input);
    }
    this.Bill(this.input);

  }

  Catagory1(input:any)
  { 
    if (input <50)
    {
      this.output = input*1.45;
      this.Final_output= this.output +25;
      this.CurrentBill=this.Final_output
      }
    if (input <100 && input >50 )
    {
      input -= 50;
      this.temp1 = 50*1.45;
      this.temp2 = this.input*2.6;
      this.output = this.temp1+this.temp2;
      this.Final_output = this.output+this.DC_CATA+this.FC_CATA;
      this.CurrentBill=this.Final_output
              
    }
  }
  
  
   Catagory2(input:any)
  {
    if (input >100 && input <200)
    {
    input -= 100;
    this.temp1 = 100*3.3;
    this.temp2 = this.input*4.3;
    this.output = this.temp1+this.temp2;
    this.Final_output = this.output+this.DC_CATB+this.FC_CATB;
    
    this.CurrentBill=this.Final_output

    }
  }
  
  Category3(input:any){
    
    if ( input >200 && input<300)
    {
      input -= 200;
      this.temp1 = 200*5;
      this.temp2 = this.input*7.2;
      this.output = this.temp1+this.temp2;
      this.Final_output = this.output+this.DC_CATC+this.FC_CATC;
      this.CurrentBill=this.Final_output

    }
    
    if (input >300 && input <400 )
    {
      input -= 300;
      this.temp1 = 200*5;
      this.temp2 = 100*7.2;
      this.temp3 = this.input*8.5;
      this.output = this.temp3+this.temp2+this.temp1;
      this.Final_output = this.output +this. DC_CATC + this.FC_CATC;               
      this.CurrentBill=this.Final_output

    }
    
    if (input >400 && input <800)
    {
       input -= 400;
       this.temp1 = 200 * 5;
       this.temp2 = 100 * 7.2;
       this.temp3 = 100 * 8.5;
       this.temp4 = this.input * 9;
       this.output = this.temp1+this.temp2+this.temp3+this.temp4;
       this.Final_output = this.output + this.DC_CATC + this.FC_CATC;             
       this.CurrentBill=this.Final_output

    }

    if (input >800)
    {
      input -= 800;
      this.temp1 = 200 * 5;
      this.temp2 = 100 * 7.2;
      this.temp3 = 100 * 8.5;
      this.temp4 = 400 * 9;
      this.temp5 = this.input * 9.5;
      this.output = this.temp1+this.temp2+this.temp3+this.temp4+this.temp5;
      this.Final_output = this.output + this.DC_CATC + this.FC_CATC;            
      this.CurrentBill=this.Final_output;

   
    }
  }

  Bill(input:any){
    this.Catagory1(input);
    this.Catagory2(input);
    this.Category3(input);
  }

  isToday30th(): boolean {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    return dayOfMonth === 30;
  }

}
