import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateMenuRoutingModule } from './create-menu-routing.module';
import { CreateMenuComponent } from './components/create-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateMenuComponent],
  imports: [
    CommonModule,
    CreateMenuRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CreateMenuModule { }
