import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(public router : Router) { }

  nav_dashboard(){
    this.router.navigate(["dashboard"]);
  }
  nav_setlimits(){
    this.router.navigate(["setlimits"]);
  }
  nav_industryDashboard(){
    this.router.navigate(['industrydashboard']);
  }
  nav_industryanomalies(){
    this.router.navigate(['industryanamolies']);
  }
}
