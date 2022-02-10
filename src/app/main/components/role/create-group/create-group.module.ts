import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGroupRoutingModule } from './create-group-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateGroupComponent } from './components/create-group.component';


@NgModule({
  declarations: [CreateGroupComponent],
  imports: [
    CommonModule,
    CreateGroupRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreateGroupComponent,
  ]
})
export class CreateGroupModule { }
