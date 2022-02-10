import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {

  order_id: number | null = null;
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  transaction: any = [];
  id: number | null = null;
  status: any;
  // from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

  // toDate = new Date(new Date().getTime() - 3600 * 60 * 60 * 1000);
  // to = this.dtPipe.transform(this.toDate, 'yyyy-MM-dd');
  from: any;
  toDate: any;
  to: any;
  model: any;
  model1: any;
  public isCollapsed = true;
  public start: any;
  public end: any;
  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dtPipe: DatePipe,private authService: AuthService,
  ) { }



  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName(`Customer Transactions`); 
    this.getOrderHistory(1)
  }

  IsRangeDate(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getOrderHistory(1);
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
 
  IsStatus(event: any) {
    let status = event.target.value
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get('payment/?status=' + status, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.transaction = responseData.data.payment;
      this.totalItems = responseData.data.count;
      if (this.transaction.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }
  IsSatatusChange(status: any) {
    this.status = status;
    this.getOrderHistory(1);
    this.currentPage = 1;
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get('payment/?status=' + status, null, { params: params }).subscribe((res: any) => {
    //   console.log(res)
    //   const responseData = res;
    //   this.transaction = responseData.data.payment;
    //   this.totalItems = responseData.data.count;
    //   if (this.transaction.length === 0) {
    //     this.toastr.warning("No Record Found");
    //   }
    // });
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
    this.http.get(`payment/?from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
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
    this.http.get('payment/?status=' + this.status + `&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
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