import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCuisinesComponent } from './components/view-cuisines.component';

const routes: Routes = [
  { path: '', component: ViewCuisinesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCuisinesRoutingModule { }
