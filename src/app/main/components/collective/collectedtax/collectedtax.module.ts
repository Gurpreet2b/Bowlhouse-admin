import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectedtaxRoutingModule } from './collectedtax-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CollectedtaxComponent } from './components/collectedtax.component';


@NgModule({
  declarations: [CollectedtaxComponent],
  imports: [
    CommonModule,
    CollectedtaxRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class CollectedtaxModule { }
