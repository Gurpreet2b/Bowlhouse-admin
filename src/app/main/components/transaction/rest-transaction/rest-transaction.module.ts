import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestTransactionRoutingModule } from './rest-transaction-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RestTransactionComponent } from './components/rest-transaction.component';


@NgModule({
  declarations: [RestTransactionComponent],
  imports: [
    CommonModule,
    RestTransactionRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule
  ]
})
export class RestTransactionModule { }
