import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewClustersRoutingModule } from './view-clusters-routing.module';
import { ViewClustersComponent } from './components/view-clusters.component';
import { CreateClusterModule } from '../create-cluster/create-cluster.module';


@NgModule({
  declarations: [ViewClustersComponent],
  imports: [
    CommonModule,
    ViewClustersRoutingModule,
    NgbModalModule,
    NgxPaginationModule,
    CreateClusterModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewClustersModule { }
