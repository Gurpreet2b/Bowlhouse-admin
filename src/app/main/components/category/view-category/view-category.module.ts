import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCategoryRoutingModule } from './view-category-routing.module';
import { ViewCategoryComponent } from './components/view-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ViewCategoryComponent],
  imports: [
    CommonModule,
    ViewCategoryRoutingModule,
    NgbModalModule,
    NgxPaginationModule
  ]
})
export class ViewCategoryModule { }
