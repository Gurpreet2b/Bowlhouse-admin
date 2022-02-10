import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelppaymentComponent } from './components/helppayment.component';

const routes: Routes = [
  { path: '', component: HelppaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelppaymentRoutingModule { }
