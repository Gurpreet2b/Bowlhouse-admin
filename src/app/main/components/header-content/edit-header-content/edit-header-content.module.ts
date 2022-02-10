import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditHeaderContentRoutingModule } from './edit-header-content-routing.module';
import { EditHeaderContentsComponent } from './components/edit-header-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditHeaderContentsComponent],
  imports: [
    CommonModule,
    EditHeaderContentRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EditHeaderContentModule { }
