import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOfferRoutingModule } from './view-offer-routing.module';
import { ViewOfferComponent } from './components/view-offer.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateOfferModule } from '../create-offer/create-offer.module';


@NgModule({
  declarations: [ViewOfferComponent],
  imports: [
    CommonModule,
    ViewOfferRoutingModule,
    NgbModalModule,
    NgxPaginationModule,
    CreateOfferModule
  ]
})
export class ViewOfferModule { }
