import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRestaurantComponent } from './components/create-restaurant.component';

const routes: Routes = [
  { path: '', component: CreateRestaurantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRestaurantRoutingModule { }
