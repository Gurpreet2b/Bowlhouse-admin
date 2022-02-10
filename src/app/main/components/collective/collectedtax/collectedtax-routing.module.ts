import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectedtaxComponent } from './components/collectedtax.component';

const routes: Routes = [
  { path: '', component: CollectedtaxComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectedtaxRoutingModule { }
