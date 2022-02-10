import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewMenusRoutingModule } from './view-menus-routing.module';
import { ViewMenusComponent } from './components/view-menus.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewMenusComponent],
  imports: [
    CommonModule,
    ViewMenusRoutingModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class ViewMenusModule { }
