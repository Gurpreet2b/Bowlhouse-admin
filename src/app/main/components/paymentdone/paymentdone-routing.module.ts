import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentdoneComponent } from './components/paymentdone.component';

const routes: Routes = [
  { path: '', component: PaymentdoneComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentdoneRoutingModule { }
