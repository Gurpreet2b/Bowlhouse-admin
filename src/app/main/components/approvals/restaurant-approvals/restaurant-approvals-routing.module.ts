import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsApprovalsComponent } from './components/restaurant-approvals.component';

const routes: Routes = [
  { path: '', component: RestaurantsApprovalsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsApprovalsRoutingModule { }
