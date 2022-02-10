import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-transaction',
  templateUrl: './order-transaction.component.html',
  styleUrls: ['./order-transaction.component.css']
})
export class OrderTransactionComponent implements OnInit {

  order_id: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  orders: any[] = [];
  details: any = [];
  customers: any = [];
  id: number | null = null;
  RestaurantName: any;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.order_id = this.activeRoute.snapshot.params['id'] || 0;
    this.getOrderHistory(1)
  }


  detailsData: any;
  private getOrderHistory(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`order/${this.order_id}`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      console.log(res)
      this.orders = responseData.data.inorder;
      this.detailsData = responseData.data;
      this.RestaurantName = responseData.data.restaurant.id;
      this.details = responseData.data.payment_detail;
      this.customers = responseData.data.customer;
      this.totalItems = responseData.data.count;
    });
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getOrderHistory(event)
  }

}
