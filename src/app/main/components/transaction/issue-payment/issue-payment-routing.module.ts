import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuePaymentComponent } from './components/issue-payment.component';

const routes: Routes = [
  { path: '', component: IssuePaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuePaymentRoutingModule { }
