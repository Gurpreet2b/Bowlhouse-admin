import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user.component';
import { UserDetailComponent } from './user-detail/components/user-detail.component';

const routes: Routes = [  
  { path: '', component: UserComponent},
  // { path: 'user-detail/:id', component: UserDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
