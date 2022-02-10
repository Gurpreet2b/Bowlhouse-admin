import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentDetailComponent } from './components/payment-detail.component';

const routes: Routes = [
  { path: '', component: PaymentDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentDetailRoutingModule { }
