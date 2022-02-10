import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditClusterComponent } from './components/edit-cluster.component';

const routes: Routes = [
  { path: '', component: EditClusterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditClusterRoutingModule { }
