import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectiveComponent } from './components/collective.component';

const routes: Routes = [
  { path: '', component: CollectiveComponent },
  { path: 'collsales', loadChildren: ()=>import('@main/components/collective/collsales/collsales.module').then(m=>m.CollsalesModule)},
  { path: 'commision', loadChildren: ()=>import('@main/components/collective/commision/commision.module').then(m=>m.CommisionModule)},
  { path: 'delivery', loadChildren: ()=>import('@main/components/collective/delivery/delivery.module').then(m=>m.DeliveryModule)},
  { path: 'collectedtax', loadChildren: ()=>import('@main/components/collective/collectedtax/collectedtax.module').then(m=>m.CollectedtaxModule)},
  { path: 'refunddash', loadChildren: ()=>import('@main/components/collective/refunddash/refunddash.module').then(m=>m.RefunddashModule)},
  { path: 'subscriptions', loadChildren: ()=>import('@main/components/collective/subscriptions/subscriptions.module').then(m=>m.SubscriptionsModule)},
  { path: 'dashorders', loadChildren: ()=>import('@main/components/collective/dashorders/dashorders.module').then(m=>m.DashordersModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectiveRoutingModule { }
