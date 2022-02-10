import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailOfferRoutingModule } from './detail-offer-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailOfferComponent } from './components/detail-offer.component';

@NgModule({
  declarations: [DetailOfferComponent],
  imports: [
    CommonModule,
    DetailOfferRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DetailOfferModule { }
