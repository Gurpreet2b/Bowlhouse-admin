import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateHeaderContentRoutingModule } from './create-header-content-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { CreateHeaderContentComponent } from './components/create-header-content.component';


@NgModule({
  declarations: [CreateHeaderContentComponent],
  imports: [
    CommonModule,
    CreateHeaderContentRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateHeaderContentComponent,
  ]
})
export class CreateHeaderContentModule { }
