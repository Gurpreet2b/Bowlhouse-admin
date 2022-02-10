import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceDetailRoutingModule } from './invoice-detail-routing.module';
import { InvoiceDetailComponent } from './components/invoice-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InvoiceDetailComponent],
  imports: [
    CommonModule,
    InvoiceDetailRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class InvoiceDetailModule { }
