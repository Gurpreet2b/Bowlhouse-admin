import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsComponent } from './components/subscriptions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class SubscriptionsModule { }
