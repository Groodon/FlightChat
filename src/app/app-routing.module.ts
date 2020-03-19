import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlightComponent} from './flight/flight.component';


const routes: Routes = [
  {
    path: 'flight/:id',
    component: FlightComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
