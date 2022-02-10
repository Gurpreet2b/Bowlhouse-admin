import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRestaurantRoutingModule } from './edit-restaurant-routing.module';
import { EditRestaurantComponent } from './components/edit-restaurant.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [EditRestaurantComponent],
  imports: [
    CommonModule,
    EditRestaurantRoutingModule,
    ReactiveFormsModule,
    NgbTimepickerModule
  ]
})
export class EditRestaurantModule { }
