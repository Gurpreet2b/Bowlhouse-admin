import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
 
  order_id: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  orders: any[] = [];
  details: any = [];
  customers: any = [];
  id: number | null = null;
  cancelRemarks: any;
  public loading = false;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.order_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName(``);
    this.getOrderHistory(1)
  }


  detailsData: any;
  CouponDetailsData: any;
  private getOrderHistory(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`order/${this.order_id}`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      console.log(res)
      this.orders = responseData.data.inorder;
      this.detailsData = responseData.data;
      this.CouponDetailsData = responseData.data.coupon;
      this.details = responseData.data.payment_detail;
      this.customers = responseData.data.customer;
      this.totalItems = responseData.data.count;
    });
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getOrderHistory(event)
  }

  IsCancelOrder() {
    if(this.cancelRemarks === '' || this.cancelRemarks === undefined || this.cancelRemarks === null){
      this.toastr.warning('Please Enter Reason For Order Discard');
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('remarks', this.cancelRemarks);
    this.http.post(`order/${this.order_id}/cancel_order/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success('Order Discard Successfully');
        this.onOrderDismiss();
        this.loading = false;
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    },
    (error: any) =>{
      this.toastr.error(error.message);
      this.loading = false;
    });
  }

  onOrderDismiss() {
    const target = "#CancelOrderModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}