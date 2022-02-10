import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  
  order_id: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  orders: any = [];
  id: number | null = null;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.customer_id = this.activeRoute.snapshot.params['id'] || 0;
    // this.order_id = this.activeRoute.snapshot.params['order_id'] || 0;
    this.getOrderHistory(1)
  }


  private getOrderHistory(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`customer/order/?customer_id=${this.customer_id}`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      console.log(res)
      this.orders = responseData.data;
      this.totalItems = responseData.data.count;
      // this.toastr.success("Orders List");

    });
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getOrderHistory(event)
  }

  onDeleteMenuItem(id: number) {
    this.http.delete(`foodmenu/${id}/`).subscribe((res: any) => {
      this.getOrderHistory(this.currentPage)
    });
  }

}