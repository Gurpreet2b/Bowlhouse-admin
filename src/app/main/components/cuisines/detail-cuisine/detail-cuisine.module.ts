import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailCuisineRoutingModule } from './detail-cuisine-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailCuisineComponent } from './components/detail-cuisine.component';

@NgModule({
  declarations: [DetailCuisineComponent],
  imports: [
    CommonModule,
    DetailCuisineRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DetailCuisineModule { }
