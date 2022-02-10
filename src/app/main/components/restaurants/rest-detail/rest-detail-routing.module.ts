import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestDetailComponent } from './components/rest-detail.component';

const routes: Routes = [
  { path: '', component: RestDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestDetailRoutingModule { }
