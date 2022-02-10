import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMenuComponent } from './components/create-menu.component';

const routes: Routes = [
  { path: '', component: CreateMenuComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateMenuRoutingModule { }
