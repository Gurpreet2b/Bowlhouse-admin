import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: ()=>import('@main/components/menus/view-menus/view-menus.module').then(m=>m.ViewMenusModule)},
  { path: 'create', loadChildren: ()=>import('@main/components/menus/create-menu/create-menu.module').then(m=>m.CreateMenuModule)},
  { path: ':menuItemId/edit', loadChildren: ()=>import('@main/components/menus/edit-menu/edit-menu.module').then(m=>m.EditMenuModule)},
  { path: ':restaurant_id', loadChildren: ()=>import('@main/components/menus/view-menus/view-menus.module').then(m=>m.ViewMenusModule)},
  // { path: ':id', loadChildren: ()=>import('@main/components/menus/menu-detail/menu-detail.module').then(m=>m.MenuDetailModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
