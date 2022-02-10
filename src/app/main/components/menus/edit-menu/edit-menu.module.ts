import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditMenuRoutingModule } from './edit-menu-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMenuComponent } from './components/edit-menu.component';


@NgModule({
  declarations: [EditMenuComponent],
  imports: [
    CommonModule,
    EditMenuRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditMenuModule { }
