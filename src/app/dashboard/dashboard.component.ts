import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { HttpClient } from '@angular/common/http';
import { CurrentBillService } from '../current-bill.service';
import { SetLimitsComponent } from '../set-limits/set-limits.component';
import { LimitService } from '../limit.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public nav: NavigationService, public http: HttpClient,public Bill:CurrentBillService, public SetLimits:LimitService) {}


  ngOnInit(): void {
  }
  units:any = this.Bill.UnitsAtThisInstant;
  limits:any = this.SetLimits.yourMonthlyLimits;
  limitsleft: any = this.limits-this.units;
 targetbill:any = this.Bill.Bill(this.limits);
}
