import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCuisineRoutingModule } from './create-cuisine-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { CreateCuisineComponent } from './components/create-cuisine.component';


@NgModule({
  declarations: [CreateCuisineComponent],
  imports: [
    CommonModule,
    CreateCuisineRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateCuisineModule { }
