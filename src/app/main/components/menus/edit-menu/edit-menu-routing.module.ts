import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMenuComponent } from './components/edit-menu.component';

const routes: Routes = [
  { path: '', component: EditMenuComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditMenuRoutingModule { }
