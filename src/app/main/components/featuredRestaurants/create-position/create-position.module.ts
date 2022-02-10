import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePositionRoutingModule } from './create-position-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePositionComponent } from './components/create-position.component';


@NgModule({
  declarations: [CreatePositionComponent],
  imports: [
    CommonModule,
    CreatePositionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreatePositionComponent,
  ]
})
export class CreatePositionModule { }
