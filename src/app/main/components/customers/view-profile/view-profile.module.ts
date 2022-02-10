import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProfileRoutingModule } from './view-profile-routing.module';
import { ViewProfileComponent } from './components/view-profile.component';

import { TabModule } from 'angular-tabs-component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [ViewProfileComponent],
  imports: [
    CommonModule,
    ViewProfileRoutingModule,
    TabModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ViewProfileModule { }
