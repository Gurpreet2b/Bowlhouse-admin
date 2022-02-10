import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCuisinesRoutingModule } from './view-cuisines-routing.module';
import { ViewCuisinesComponent } from './components/view-cuisines.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ViewCuisinesComponent],
  imports: [
    CommonModule,
    ViewCuisinesRoutingModule,
    NgbModalModule,
    NgxPaginationModule
  ]
})
export class ViewCuisinesModule { }
