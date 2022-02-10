import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCuisineRoutingModule } from './edit-cuisine-routing.module';
import { EditCuisineComponent } from './components/edit-cuisine.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditCuisineComponent],
  imports: [
    CommonModule,
    EditCuisineRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditCuisineModule { }
