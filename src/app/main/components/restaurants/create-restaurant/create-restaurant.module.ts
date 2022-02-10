import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRestaurantRoutingModule } from './create-restaurant-routing.module';
import { CreateRestaurantComponent } from './components/create-restaurant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CreateRestaurantComponent],

  imports: [
    CommonModule,
    CreateRestaurantRoutingModule,
    ReactiveFormsModule,
    NgbTimepickerModule
  ],

})
export class CreateRestaurantModule { }
