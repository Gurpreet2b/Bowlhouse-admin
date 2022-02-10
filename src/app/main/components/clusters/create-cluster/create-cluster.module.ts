import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  ReactiveFormsModule } from '@angular/forms';
import { CreateClusterRoutingModule } from './create-cluster-routing.module';
import { CreateClusterComponent } from './components/create-cluster.component';


@NgModule({
  declarations: [CreateClusterComponent],
  imports: [
    CommonModule,
    CreateClusterRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateClusterComponent,
  ]
})
export class CreateClusterModule { }
