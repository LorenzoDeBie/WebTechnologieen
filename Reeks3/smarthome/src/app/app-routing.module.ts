import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {EnergyComponent} from './energy/energy.component';
import {SecurityComponent} from './security/security.component';
import {NotificationDetailComponent} from './notification-detail/notification-detail.component';


const routes: Routes = [
  { path: '', component: OverviewComponent},
  { path: 'Overview', component: OverviewComponent },
  { path: 'Temperature', component: TemperatureComponent},
  { path: 'Energy', component: EnergyComponent},
  { path: 'Security', component: SecurityComponent},
  { path: 'notification/:id', component: NotificationDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
