import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllordersComponent } from './components/allorders.component';

const routes: Routes = [ 
    { path: '', component: AllordersComponent},
    { path: ':date', component: AllordersComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllordersRoutingModule { }
