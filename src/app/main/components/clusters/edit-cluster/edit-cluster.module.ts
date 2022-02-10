import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { EditClusterRoutingModule } from './edit-cluster-routing.module';
import { EditClusterComponent } from './components/edit-cluster.component';


@NgModule({
  declarations: [EditClusterComponent],
  imports: [
    CommonModule,
    EditClusterRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditClusterModule { }
