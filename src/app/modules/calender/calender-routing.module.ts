import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from "../clients/Pages/clients/clients.component";
import {CalenderComponent} from "./Pages/calender/calender.component";

const routes: Routes = [
  { path: '', component: CalenderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalenderRoutingModule { }
