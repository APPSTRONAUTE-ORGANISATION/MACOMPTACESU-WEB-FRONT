import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceComponent } from './Pages/performance/performance.component';
import { WeeksComponent } from './Pages/weeks/weeks.component';
import { ComparatifComponent } from './Pages/comparatif/comparatif.component';

const routes: Routes = [
  { path : '' , component : PerformanceComponent},
  { path : 'compratif' , component : ComparatifComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
