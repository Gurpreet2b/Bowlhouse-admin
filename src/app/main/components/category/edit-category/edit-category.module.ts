import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCategoryRoutingModule } from './edit-category-routing.module';
import { EditCategoryComponent } from './components/edit-category.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditCategoryComponent],
  imports: [
    CommonModule,
    EditCategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditCategoryModule { }
