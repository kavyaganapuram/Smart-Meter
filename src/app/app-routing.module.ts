import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SetLimitsComponent } from './set-limits/set-limits.component';
import { HomeComponent } from './home/home.component';
import { IndustryDashboardComponent } from './industry-dashboard/industry-dashboard.component';

const routes: Routes = [
  {path:"", redirectTo:"/home",pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"setlimits",component:SetLimitsComponent},
  {path:"industrydashboard",component:IndustryDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}