import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rest-transaction',
  templateUrl: './rest-transaction.component.html',
  styleUrls: ['./rest-transaction.component.css']
})
export class RestTransactionComponent implements OnInit {

  order_id: number | null = null;
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  transaction: any = [];
  id: number | null = null;
  from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

  toDate = new Date(new Date().getTime() - 3600 * 60 * 60 * 1000);
  to = this.dtPipe.transform(this.toDate, 'yyyy-MM-dd');
  // from: any;
  // toDate: any;
  // to: any;
  model: any;
  model1: any;
  public isCollapsed = true;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dtPipe: DatePipe,
  ) { }



  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    // this.order_id = this.activeRoute.snapshot.params['order_id'] || 0;
    this.getOrderHistory(1)
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
 

  IsSatatusChange(status: any) {
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get('payment/?status=' + status, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  getAll() {
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get('payment/?', null, { params: params }).subscribe((res: any) => {
      console.log(res)
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
    this.http.get(`payment/&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.transaction = responseData.data.payment;
      // console.log(this.orders)
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
  private getOrderHistory(page: number) {

    let params = new HttpParams();
    params = params.append('page', page.toString())

    // this.http.get(`payment/?restaurant_id=${this.restaurant_id}`, null, { params: params }).subscribe((res: any) => {
      this.http.get('payment/?', null, { params: params }).subscribe((res: any) => { 
    console.log(res)
      const responseData = res;
      this.transaction = responseData.data.payment;
      // console.log(this.orders)
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
