import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuisinesComponent } from './components/cuisines.component';

const routes: Routes = [
  { path: 'create', loadChildren: ()=>import('@main/components/cuisines/create-cuisine/create-cuisine.module').then(m=>m.CreateCuisineModule)},
  { path: '', loadChildren: ()=>import('@main/components/cuisines/view-cuisines/view-cuisines.module').then(m=>m.ViewCuisinesModule)},
  { path: ':id', loadChildren: ()=>import('@main/components/cuisines/edit-cuisine/edit-cuisine.module').then(m=>m.EditCuisineModule)},
  { path: 'information', loadChildren: ()=>import('@main/components/cuisines/detail-cuisine/detail-cuisine.module').then(m=>m.DetailCuisineModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuisinesRoutingModule { }
