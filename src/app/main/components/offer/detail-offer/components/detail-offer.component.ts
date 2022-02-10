import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.css']
})
export class DetailOfferComponent implements OnInit {
  couponId: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  OfferDetails: any;
  OfferPreviousDetails: any;
  detail: any
  id: number | null = null;
  public loading = false;
  ApproveValue: any;
  offerId: any;
  comment: any;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.couponId = this.activeRoute.snapshot.params['id'] || 0;
    this.auth.SetRestaurantName(`Offers Approval`); 
    // this.ApproveValue = this.activeRoute.snapshot.params['approval'];
    // if(this.ApproveValue === 'approval') {
      this.getApprovalCoupon();
    // } else {
    //   this.getRestCuisine();
    // }
  }

  private getApprovalCoupon() {
    this.loading = true;
    this.http.get(`coupons_category_approval/${this.couponId}/`).subscribe((res: any) => {
      this.loading = false;
      this.OfferDetails = res.data;
      this.offerId = res.data.coupons_category_id;
      if(this.OfferDetails.action === 'edit'){
        this.getPreviousCoupon();
      }
    });
  }

  private getPreviousCoupon() {
    this.loading = true;
    this.http.get(`coupons_category/${this.offerId}/`).subscribe((res: any) => {
      this.loading = false;
      this.OfferPreviousDetails = res.data;
    });
  }

  IsApproval(){
    this.loading = true;
    const formData = new FormData();
    this.http.post(`coupons_category_approval/${this.couponId}/approved/`, formData).subscribe((res: any) => {
      this.loading = false;
      const responseData: any = res.data;
      if (responseData.status === true) {
        this.toastr.success('Offer Approved Successfully !!');
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
      this.toastr.warning('Please enter reason for coupon offer discard');
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('status', 'REJECTED');
    formData.append('comment', this.comment);
    this.http.patch(`coupons_category_approval/${this.couponId}/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success('Coupon Comment Successfully');
        this.onCustomerDismiss();
        this.router.navigateByUrl(`/restaurant-approvals`);
        this.loading = false;
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    });
  }

  onCustomerDismiss() {
    const target = "#DiscardModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
