import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailRoutingModule } from './user-detail-routing.module';
import {   ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { UserDetailComponent } from './components/user-detail.component';
import { ChangePasswordModule } from '../change-password/change-password.module';

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChangePasswordModule
  ],
})
export class UserDetailModule { }
