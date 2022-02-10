import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBankRoutingModule } from './edit-bank-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditBankComponent } from './components/edit-bank.component';


@NgModule({
  declarations: [EditBankComponent],
  imports: [
    CommonModule,
    EditBankRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditBankModule { }
