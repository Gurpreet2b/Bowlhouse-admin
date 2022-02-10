import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCuisineComponent } from './components/edit-cuisine.component';

const routes: Routes = [
  { path: '', component: EditCuisineComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCuisineRoutingModule { }
