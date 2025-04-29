import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SemainesComponent } from './Pages/semaines/semaines.component';

const routes: Routes = [
  {
    path : '' , component : SemainesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemainesRoutingModule { }
