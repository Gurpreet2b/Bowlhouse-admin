import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditOfferRoutingModule } from './edit-offer-routing.module';
import { EditOffersComponent } from './components/edit-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditOffersComponent],
  imports: [
    CommonModule,
    EditOfferRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EditOfferModule { }
