import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalPaymentComponent } from './components/final-payment.component';

const routes: Routes = [
  { path: '', component: FinalPaymentComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalPaymentRoutingModule { }
