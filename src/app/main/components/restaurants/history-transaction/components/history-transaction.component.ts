import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history-transaction',
  templateUrl: './history-transaction.component.html',
  styleUrls: ['./history-transaction.component.css']
})
export class HistoryTransactionComponent implements OnInit {
  status: any;
  order_id: number | null = null;
  restaurant_id: number | null = null;
  currentPage: number = 1;
  rcurrentPage: number = 1;
  totalItems: number | undefined;
  RefundtotalItems: number | undefined;
  transaction: any = [];
  public loading = false;
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
  fromDate: any;
  model: any;
  model1: any;
  public isCollapsed = true;
  public start: any;
  public end: any;
  public IsStatusCheck = false;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dtPipe: DatePipe,
    private auth: AuthService
  ) { }



  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
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
    this.currentPage = 1;
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

  IsRefund(event: any) {
    this.RefundStatus = event.target.value;
    this.getRefund(1);
    this.rcurrentPage = 1;
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get(`refund/?restaurant_id=${this.restaurant_id}&status=` + status, null, { params: params }).subscribe((res: any) => {
    //   console.log(res)
    //   const responseData = res;
    //   this.refunds = responseData.data.refund;
    //   this.RefundtotalItems = responseData.data.count;
    //   if (this.refunds.length === 0) {
    //     this.toastr.warning("No Record Found");
    //   }
    // });
  }
  IsStatus(status: any) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`payment/?restaurant_id=${this.restaurant_id}&status=` + status, null, { params: params }).subscribe((res: any) => {
      this.loading = false;
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.detail = responseData.data.payment[0].order.restaurant;
      this.auth.SetRestaurantName(`${this.detail.name} - Transactions`); 
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }
  IsStatusChange(event: any) {
    this.loading = true;
    this.Status = event.target.value;
    this.getOrderHistory(1);
    this.currentPage = 1;
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get('payment/?status=' + status, null, { params: params }).subscribe((res: any) => {
    //   this.loading = false;
    //   const responseData = res;
    //   this.transaction = responseData.data.payment;
    //   this.detail = responseData.data.payment[0].order.restaurant;
    //   this.auth.SetRestaurantName(`${this.detail.name} - Transactions`); 
    //   this.totalItems = responseData.data.count;
    //   if (this.transaction.length === 0) {
    //     this.toastr.warning("No Record Found");
    //   }
    // });
  }

  getAll() {
    this.loading = true;
    this.IsStatusCheck = false;
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`payment/?restaurant_id=${this.restaurant_id}`, null, { params: params }).subscribe((res: any) => {
      this.loading = false;
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.detail = responseData.data.payment[0].order.restaurant;
      this.auth.SetRestaurantName(`${this.detail.name} - Transactions`); 
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }
  getRefundTab(){
    this.IsStatusCheck = true;
  }
  private getByDate(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`payment/?restaurant_id=${this.restaurant_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      this.loading = false;
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.detail = responseData.data.payment[0].order.restaurant;
      this.auth.SetRestaurantName(`${this.detail.name} - Transactions`); 
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }
  private getDate(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`refund/?restaurant_id=${this.restaurant_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.refunds = responseData.data.refund;
      this.RefundtotalItems = responseData.data.count;
      if (this.refunds.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }
  PageTotalNumberTransaction: any = [];
  PageJump: any = 10;
  Status: any;
  private getOrderHistory(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`payment/?restaurant_id=${this.restaurant_id}` + '&status=' + this.Status, null, { params: params }).subscribe((res: any) => {
      this.loading = false;
      const responseData = res;
      // console.log(res)
      this.transaction = responseData.data.payment;

      this.PageTotalNumberTransaction = [];
      let Count = responseData.data.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumberTransaction.push(i);
      }
      this.detail = responseData.data.payment[0].order.restaurant;
      this.auth.SetRestaurantName(`${this.detail.name} - Transactions`); 
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  PageTotalNumberRefund: any = [];
  RefundStatus: any;
  private getRefund(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`refund/?restaurant_id=${this.restaurant_id}` + '&status=' + this.RefundStatus, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      console.log(res)
      this.refunds = responseData.data.refund;
      this.RefundtotalItems = responseData.data.count;
      
      this.PageTotalNumberRefund = [];
      let Count = responseData.data.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumberRefund.push(i);
      }
      // console.log(this.refunds)
      this.details = responseData.data.refund.order.payment_detail;
      this.detail = responseData.data.payment[0].order.restaurant;
      this.auth.SetRestaurantName(`${this.detail.name} - Transactions`); 
      if (this.refunds.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  onPageChange(event: any, data: any) {
    if(data === '1'){
      this.currentPage = event;
      this.getOrderHistory(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getOrderHistory(this.currentPage)
    }  
  }

  onPage(event: any, data: any) {
    if(data === '1'){
      this.rcurrentPage = event;
      this.getRefund(event)
    } else {
      this.rcurrentPage = Number(event.target.value);
      this.getRefund(this.rcurrentPage)
    }  
  }
 
  onDeleteMenuItem(id: number) {
    this.http.delete(`foodmenu/${id}/`).subscribe((res: any) => {
      this.getOrderHistory(this.currentPage)
    });
  }

}
