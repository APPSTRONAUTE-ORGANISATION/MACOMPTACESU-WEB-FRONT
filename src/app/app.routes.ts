import { Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guard/auth/is-logined.guard';
import {NotFoundPageComponent} from "./shared/component/not-found-page/not-found-page.component";

export const routes: Routes = [
    {
        path: 'auth', loadChildren: () => import('./modules/auth/auth.module')
        .then(m => m.AuthModule)
    },
    {
        path : '', loadChildren: () => import('./modules/home/home.module')
        .then(m => m.HomeModule),
        canActivate:[isLoggedInGuard]
    } ,{
        path : 'settings' , loadChildren:() => import('./modules/settings/settings.module')
        .then(m => m.SettingsModule),
        canActivate:[isLoggedInGuard]
    },{
        path: 'users' , loadChildren:() => import('./modules/users/users.module')
        .then(m => m.UsersModule),
        canActivate:[isLoggedInGuard]
    } , {
        path : 'clients' , loadChildren : () => import('./modules/clients/clients.module')
        .then(m => m.ClientsModule),
        canActivate:[isLoggedInGuard]
    } ,
  {
      path : 'support' , loadChildren : () => import('./modules/support/support.module')
      .then(m => m.SupportModule),
      canActivate:[isLoggedInGuard]
  },
  {
    path : 'calender' , loadChildren : () => import('./modules/calender/calender.module')
      .then(m => m.CalenderModule),
    canActivate:[isLoggedInGuard]
  },
  {
    path : 'historical_payments' , loadChildren :() => import('./modules/subscriptions/subscriptions/subscriptions.module')
      .then(m => m.SubscriptionsModule)
  },
  {
    path : 'expenses' , loadChildren : () => import('./modules/expenses/expenses.module')
      .then(m => m.ExpensesModule),
    canActivate:[isLoggedInGuard]
  },
  {
    path : 'payments' , loadChildren : () => import('./modules/payments/payments.module')
      .then(m => m.PaymentsModule),
  },
  {
    path : 'performance' , loadChildren : () =>  import('./modules/performance/performance.module')    
    .then(m => m.PerformanceModule)
  },
  {
    path : 'budgets' , loadChildren : () =>  import('./modules/budgets/budgets/budgets.module')    
    .then(m => m.BudgetsModule)
  },
  {
    path : 'invoices' , loadChildren : () =>  import('./modules/invoices/invoices.module')    
    .then(m => m.InvoicesModule)
  },

  {
    path : 'weeks' , loadChildren : () =>  import('./modules/semaines/semaines.module')    
    .then(m => m.SemainesModule)
  },
  {
    path : 'vacation' , loadChildren : () =>  import('./modules/vacation/vacation/vacation.module')    
    .then(m => m.VacationModule)
  },
  {
    path : '**',
    component : NotFoundPageComponent
  }
];
