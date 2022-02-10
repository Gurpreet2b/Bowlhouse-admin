import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailCuisineComponent } from './components/detail-cuisine.component';

const routes: Routes = [
  { path: ':id', component: DetailCuisineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailCuisineRoutingModule { }
