import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCategoryRoutingModule } from './create-category-routing.module';
import { CreateCategoryComponent } from './components/create-category.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateCategoryComponent],
  imports: [
    CommonModule,
    CreateCategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateCategoryModule { }
