import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './Pages/invoices/invoices.component';
import { NotificationsComponent } from './Pages/notifications/notifications.component';

const routes: Routes = [
  {
    path : '' , component : InvoicesComponent,
    
  },
  {
    path : 'notifications' , component : NotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
