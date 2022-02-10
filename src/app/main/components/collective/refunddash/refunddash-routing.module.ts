import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefunddashComponent } from './components/refunddash.component';

const routes: Routes = [
  { path: '', component: RefunddashComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefunddashRoutingModule { }
