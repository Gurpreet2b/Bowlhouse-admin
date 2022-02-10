import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedRestaurantsComponent } from './components/featuredRestaurants.component';

const routes: Routes = [  { path: '', component: FeaturedRestaurantsComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturedRestaurantsRoutingModule { }
