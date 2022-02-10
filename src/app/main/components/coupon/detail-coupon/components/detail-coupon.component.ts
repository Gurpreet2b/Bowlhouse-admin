import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-coupon',
  templateUrl: './detail-coupon.component.html',
  styleUrls: ['./detail-coupon.component.css']
})
export class DetailCouponComponent implements OnInit {
  couponId: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  CouponDetails: any;
  CouponPreviousDetails: any;
  detail: any
  id: number | null = null;
  public loading = false;
  ApproveValue: any;
  cuisineId: any;
  comment: any;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.couponId = this.activeRoute.snapshot.params['id'] || 0;
    this.auth.SetRestaurantName(`Coupon Offer Approval`); 
    // this.ApproveValue = this.activeRoute.snapshot.params['approval'];
    // if(this.ApproveValue === 'approval') {
      this.getApprovalCoupon();
    // } else {
    //   this.getRestCuisine();
    // }
  }

  CouponPreID: any;
  private getApprovalCoupon() {
    this.loading = true;
    this.http.get(`coupons_approval/${this.couponId}/`).subscribe((res: any) => {
      this.loading = false;
      this.CouponDetails = res.data;
      this.cuisineId = res.data.cuisine_id;
      this.CouponPreID = res.data.coupon.id;
      if(this.CouponDetails.action === 'edit'){
        this.getPreviousCoupon();
      }
    });
  }

  private getPreviousCoupon() {
    this.loading = true;
    this.http.get(`coupons/${this.CouponPreID}/`).subscribe((res: any) => {
      this.loading = false;
      this.CouponPreviousDetails = res.data;
    });
  }

  IsApproval(){
    this.loading = true;
    const formData = new FormData();
    this.http.post(`coupons_approval/${this.couponId}/approved/`, formData).subscribe((res: any) => {
      this.loading = false;
      const responseData: any = res.data;
      if (responseData.status === true) {
        this.toastr.success('Coupon Approved Successfully !!');
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
      this.toastr.warning('Please enter reason for coupon discard');
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('status', 'REJECTED');
    formData.append('comment', this.comment);
    this.http.patch(`coupons_approval/${this.couponId}/`, formData).subscribe((res: any) => {
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
