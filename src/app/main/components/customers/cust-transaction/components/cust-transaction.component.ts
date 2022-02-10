import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cust-transaction',
  templateUrl: './cust-transaction.component.html',
  styleUrls: ['./cust-transaction.component.css']
})
export class CustTransactionComponent implements OnInit {

  order_id: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  transaction: any = [];
  refunds: any = [];
  detail: any = [];
  details: any = [];
  id: number | null = null;
  // from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

  // toDate = new Date(new Date().getTime() - 3600 * 60 * 60 * 1000);
  // to = this.dtPipe.transform(this.toDate, 'yyyy-MM-dd');
  from: any;
  toDate: any;
  to: any;
  model: any;
  model1: any;
  status: any;
  public isCollapsed = true;
  public start: any;
  public end: any;
  public loading = false;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dtPipe: DatePipe,
  ) { }



  ngOnInit(): void {
    this.customer_id = this.activeRoute.snapshot.params['id'] || 0;
    this.getOrderHistory(1)
    this.getRefund(1)
  }

  
  IsRange(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getDate(1);
  }
  IsRangeDate(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getByDate(1);
  }
  FromDate(event: any) {
    let fromDate = event.year + '-' + event.month + '-' + event.day;
    this.from = fromDate;
  }

  ToDate(event: any) {
    let toDate = event.year + '-' + event.month + '-' + event.day;
    this.to = toDate;
    this.getByDate(1);
  }
  IsRefund(status: any) {
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`refund/?customer_id=${this.customer_id}&status=` + status, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.refunds = responseData.data.refund;
      this.totalItems = responseData.data.count;
      if (this.refunds.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  IsSatatusChange(status: any) {
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`customer/payment/?customer_id=${this.customer_id}&status=` + status, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  IsStatus(event: any) {
    let status = event.target.value
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`customer/payment/?customer_id=${this.customer_id}&status=` + status, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.detail = responseData.data.payment[0].order.restaurant;
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  getAll() {
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`customer/payment/?customer_id=${this.customer_id}`, null, { params: params }).subscribe((res: any) => {
      // console.log(res)
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }
  private getByDate(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`customer/payment/?customer_id=${this.customer_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }
  private getDate(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`refund/?customer_id=${this.customer_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.refunds = responseData.data.refund;
      this.totalItems = responseData.data.count;
      if (this.refunds.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }
  private getOrderHistory(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`customer/payment/?customer_id=${this.customer_id}`, null, { params: params }).subscribe((res: any) => {
      this.loading = false;
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.detail = responseData.data.payment[0].order.customer_id;
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
      //  else {
      //   this.toastr.success("Orders List");
      // }
      // this.toastr.success("Orders List");

    });
  }

  private getRefund(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`refund/?customer_id=${this.customer_id}`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      console.log(res)
      this.refunds = responseData.data.refund;
      // console.log(this.refunds)
      this.details = responseData.data.refund.order.payment_detail;
      console.log(this.details)
      this.detail = responseData.data.payment[0].order.restaurant;
      this.totalItems = responseData.data.count;
      if (this.refunds.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getOrderHistory(event)
  }

  onPage(event: number) {
    this.currentPage = event;
    this.getRefund(event)
  }

  onDeleteMenuItem(id: number) {
    this.http.delete(`foodmenu/${id}/`).subscribe((res: any) => {
      this.getOrderHistory(this.currentPage)
    });
  }

}