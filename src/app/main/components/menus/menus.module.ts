import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenusComponent } from './components/menus.component';
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MenusComponent],
  imports: [
    CommonModule,
    MenusRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class MenusModule { }
