import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsProfileComponent } from './Pages/settings-profile/settings-profile.component';

const routes: Routes = [
  { path: '', component: SettingsProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
