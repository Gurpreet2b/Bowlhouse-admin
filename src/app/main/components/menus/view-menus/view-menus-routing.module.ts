import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMenusComponent } from './components/view-menus.component';

const routes: Routes = [
  { path: '', component: ViewMenusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewMenusRoutingModule { }
