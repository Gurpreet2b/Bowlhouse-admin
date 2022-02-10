import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminrefundComponent } from './components/adminrefund.component';

const routes: Routes = [
  { path: '', component: AdminrefundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminrefundRoutingModule { }
