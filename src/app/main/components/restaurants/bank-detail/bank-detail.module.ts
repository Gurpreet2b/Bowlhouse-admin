import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankDetailRoutingModule } from './bank-detail-routing.module';
import { BankDetailComponent } from './components/bank-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BankDetailComponent],
  imports: [
    CommonModule,
    BankDetailRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BankDetailModule { }
