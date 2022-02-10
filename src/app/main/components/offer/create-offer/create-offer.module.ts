import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOfferRoutingModule } from './create-offer-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { CreateOffersComponent } from './components/create-offer.component';


@NgModule({
  declarations: [CreateOffersComponent],
  imports: [
    CommonModule,
    CreateOfferRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateOffersComponent,
  ]
})
export class CreateOfferModule { }
