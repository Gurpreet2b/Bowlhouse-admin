import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'create', loadChildren: ()=>import('@main/components/category/create-category/create-category.module').then(m=>m.CreateCategoryModule)},
  { path: '', loadChildren: ()=>import('@main/components/category/view-category/view-category.module').then(m=>m.ViewCategoryModule)},
  { path: ':id', loadChildren: ()=>import('@main/components/category/edit-category/edit-category.module').then(m=>m.EditCategoryModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
