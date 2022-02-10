import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuDetailRoutingModule } from './menu-detail-routing.module';
import { MenuDetailComponent } from './components/menu-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStarsModule } from 'ngx-stars';


@NgModule({
  declarations: [MenuDetailComponent],
  imports: [
    CommonModule,
    MenuDetailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarsModule
  ]
})
export class MenuDetailModule { }
