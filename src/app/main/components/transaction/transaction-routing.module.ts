import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: '', loadChildren: () => import('@main/components/transaction/view-transaction/view-transaction.module').then(m => m.ViewTransactionModule) },
{ path: 'resttransaction', loadChildren: () => import('@main/components/transaction/rest-transaction/rest-transaction.module').then(m => m.RestTransactionModule) },
{ path: 'payment', loadChildren: () => import('@main/components/transaction/issue-payment/issue-payment.module').then(m => m.IssuePaymentModule) },
{ path: 'paymentdetail/:id', loadChildren: () => import('@main/components/transaction/payment-detail/payment-detail.module').then(m => m.PaymentDetailModule) },
{ path: 'invoice', loadChildren: () => import('@main/components/transaction/invoice-detail/invoice-detail.module').then(m => m.InvoiceDetailModule) },
{ path: 'orderlist/:id', loadChildren: () => import('@main/components/transaction/order-list/order-list.module').then(m => m.OrderListModule) },
{ path: 'finalpayment/:id', loadChildren: () => import('@main/components/transaction/final-payment/final-payment.module').then(m => m.FinalPaymentModule) },
{ path: 'detailtransaction/:id', loadChildren: ()=>import('@main/components/transaction/order-transaction/order-transaction.module').then(m=>m.OrderTransactionModule)},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
