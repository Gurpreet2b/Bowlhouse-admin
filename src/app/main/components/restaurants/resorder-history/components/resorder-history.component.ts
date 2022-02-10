import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-resorder-history',
  templateUrl: './resorder-history.component.html',
  styleUrls: ['./resorder-history.component.css']
})
export class ResorderHistoryComponent implements OnInit {

  order_id: number | null = null;
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  totalRangeItems: number | undefined;
  orders: any = [];
  rangeorders: any = [];
  dateRanges: any = [];
  orderdetails: any = [];
  detail: any = [];
  id: number | null = null;
  // from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

  // toDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  // to = this.dtPipe.transform(this.toDate, 'yyyy-MM-dd');
  from: any;
  toDate: any;
  to: any;
  model: any;
  model1: any;
  fromDate: any;
  public loading = false;
  public start: any;
  public end: any;

  // public start: Date = new Date(); 

  // public end: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private dtPipe: DatePipe,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.auth.SetRestaurantName(`Order History`); 
     this.getRange(1)
    this.getOrderHistory(1)
    // this.getTodayHistory(1)
  }

  IsRangeDate(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getRange(1);
    this.loading = true;
  }

  FromDate(event: any) {
    let fromDate = event.year + '-' + event.month + '-' + event.day;
    this.from = fromDate;
  }

  ToDate(event: any) {
    let toDate = event.year + '-' + event.month + '-' + event.day;
    this.to = toDate;
    this.getOrderHistory(1);
  }

  getToday() {
    this.from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');
    this.toDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.to = this.dtPipe.transform(this.toDate, 'yyyy-MM-dd');
    this.getOrderHistory(1);
  }

  getYesterday() {
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setDate(from.getDate() - 1);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');
    this.getOrderHistory(1);
  }

  RestaurantName: any;
  ItemName: any;
  ItemQuan: any;
  PageTotalNumberHistory: any = [];
  PageJump: any = 10;
  private getOrderHistory(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`restaurant/order/?restaurant_id=${this.restaurant_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.orders = responseData.data;
      this.totalItems = responseData.data.count;

      this.PageTotalNumberHistory = [];
      let Count = responseData.data.length / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumberHistory.push(i);
      }

      console.log(this.orders)
      this.RestaurantName = responseData.data[0].status[0].restaurant;
      this.auth.SetRestaurantName(`Order History - ${this.RestaurantName}`); 
      // this.ItemName = responseData.data[0].inorder[0].item_name;
      // this.ItemQuan = responseData.data[0].inorder[0].item_quantity;

      this.loading = false;
      if (this.orders.length === 0) {
        this.toastr.warning("No Record Found");
        this.loading = false;
      } 
    });
  }

  PageTotalNumberRange: any = [];
  private getRange(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`restaurant/order/?restaurant_id=${this.restaurant_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.rangeorders = responseData.data;
      this.totalRangeItems = responseData.data.count;
      
      this.PageTotalNumberRange = [];
      let Count = responseData.data.length / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumberRange.push(i);
      }

      this.RestaurantName = responseData.data[0].status[0].restaurant;
      this.auth.SetRestaurantName(`Order History - ${this.RestaurantName}`);
      // this.ItemName = responseData.data[0].inorder[0].item_name;
      // this.ItemQuan = responseData.data[0].inorder[0].item_quantity;

      
      
      this.loading = false;
      if (this.rangeorders.length === 0) {
        this.toastr.warning("No Record Found");
        this.loading = false;
      } 
    });
  }


  getAll() {
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`restaurant/order/?restaurant_id=${this.restaurant_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.orders = responseData.data;
      console.log(this.orders)
      this.RestaurantName = responseData.data[0].status[0].restaurant;
      this.auth.SetRestaurantName(`Order History - ${this.RestaurantName}`);
      this.ItemName = responseData.data[0].inorder[0].item_name;
      this.ItemQuan = responseData.data[0].inorder[0].item_quantity

      this.totalItems = responseData.data.count;
      if (this.orders.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }
  private getHistory(page: number) {
    let params = new HttpParams();

    params = params.append('page', page.toString())
    this.http.get(`restaurant/order/?restaurant_id=${this.restaurant_id}`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.orders = responseData.data;
      console.log(this.orders)
      this.RestaurantName = responseData.data[0].status[0].restaurant;
      this.ItemName = responseData.data[0].inorder[0].item_name;
      this.ItemQuan = responseData.data[0].inorder[0].item_quantity

      this.totalItems = responseData.data.count;
      if (this.orders.length === 0) {
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
  onChange(event: number) {
    this.currentPage = event;
    this.getOrderHistory(event)
  }

  onPage(event: any, data: any) {
    if(data === '1'){
      this.currentPage = event;
      this.getRange(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getRange(this.currentPage)
    }  
  }

}