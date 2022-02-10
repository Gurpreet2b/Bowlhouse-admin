import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRestaurantsComponent } from './components/view-restaurants.component';

const routes: Routes = [
  { path: '', component: ViewRestaurantsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRestaurantsRoutingModule { }
