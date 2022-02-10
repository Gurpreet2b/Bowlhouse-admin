import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// import { $ } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-detail-cluster',
  templateUrl: './detail-cluster.component.html',
  styleUrls: ['./detail-cluster.component.css']
})
export class DetailClusterComponent implements OnInit {
  restaurant_id: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  ClusterDetails: any;
  ClusterPreviousDetails: any;
  detail: any
  id: number | null = null;
  public loading = false;
  ApproveValue: any;
  ClusterId: any;
  comment: any;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.auth.SetRestaurantName(`Cluster Approval`); 
    // this.ApproveValue = this.activeRoute.snapshot.params['approval'];
    // if(this.ApproveValue === 'approval') {
      this.getApprovalClusters();
    // } else {
    //   this.getRestCuisine();
    // }
  }

  private getApprovalClusters() {
    this.loading = true;
    this.http.get(`cluster_approval/${this.restaurant_id}/`).subscribe((res: any) => {
      this.loading = false;
      this.ClusterDetails = res.data;
      this.ClusterId = res.data.cluster_id;
      if(this.ClusterDetails.action === 'edit') {
        this.getPreviousClusters();
      }
    });
  }

  LongitudeData: any;
  LatitudeData: any;
  private getPreviousClusters() {
    this.loading = true;
    this.http.get(`cluster/${this.ClusterId}`).subscribe((res: any) => {
      this.loading = false;
      this.ClusterPreviousDetails = res.data;
      this.LongitudeData = res.data.center.coordinates[0];
      this.LatitudeData = res.data.center.coordinates[1];
    });
  }

  IsApproval(){
    this.loading = true;
    const formData = new FormData();
    this.http.post(`cluster_approval/${this.restaurant_id}/approved/`, formData).subscribe((res: any) => {
      this.loading = false;
      const responseData: any = res.data;
      if (responseData.status === true) {
        this.toastr.success('Cluster Approved Successfully !!');
        this.router.navigateByUrl(`/restaurant-approvals`);
        this.loading = false;
      } else {
        this.toastr.error(responseData.error);
        this.loading = false;
      }
    });
  }

  IsDiscard(){
    if(this.comment === '' || this.comment === undefined || this.comment === null){
      this.toastr.warning('Please enter reason for Cluster discard');
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('approved_status', 'REJECTED');
    formData.append('discard_message', this.comment);
    this.http.patch(`cluster_approval/${this.restaurant_id}/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success('Cluster Discard Successfully');
        this.onClusterDismiss();
        this.router.navigateByUrl(`/restaurant-approvals`);
        this.loading = false;
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    });
  }

  onClusterDismiss() {
    const target = "#DiscardModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
