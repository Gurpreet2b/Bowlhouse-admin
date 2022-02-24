import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';
const Excel_Extension = '.xlsx';
@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  @ViewChild('epltable', { static: false })
  epltable!: ElementRef;
  PAID: any;
  UNPAID: any;
  INITIATED: any;
  status: any;
  restaurant: any;
  public loading = false;
  customers: any = [];
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  from: any;
  to: any;
  model: any;
  model1: any;
  category: any = [];
  statuslist: any = [];
  public start: any;
  public end: any;
  public DriverDetail: any;
  FilterDate: any;

  // date = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');
  form = new FormGroup({
    search: new FormControl(''),
  });
  StatusName: any;
  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute, private authService: AuthService,
    private dtPipe: DatePipe) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.FilterDate = this.activeRoute.snapshot.params['date'] || 0;
    this.authService.SetRestaurantName(`Order Details`);
    this.getOrders(1);
    this.getCategory();
    this.getStatus();

    if(this.FilterDate === 'Today') {
      this.Today();
    } else if(this.FilterDate === 'days7') {
      this.days7();
    } else if(this.FilterDate === 'days15') {
      this.days15();
    } else if(this.FilterDate === 'days30') {
      this.days30();
    } else if(this.FilterDate === 'month6') {
      this.month6();
    } else if(this.FilterDate === 'year') {
      this.year();
    }
  }

  private getCategory() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.category = responseData.data.restaurant;
    })
  }

  private getStatus() {
    this.http.get(`order_status_catalog`).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.statuslist = responseData.data.order_status_catalog;
    })
  }

  IsDriverData(driver: any){
    this.DriverDetail = driver;
  }

  IsRangeDate(event: any) {
    let dateRange = event.value;
    if(dateRange === null){
      this.from = undefined;
      this.to = undefined;
      this.getOrders(1);
      this.currentPage = 1;
    } else {
      this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
      this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
      this.getOrders(1);
      this.currentPage = 1;
    }
    
  }
  FromDate(event: any) {
    let fromDate = event.year + '-' + event.month + '-' + event.day;
    this.from = fromDate;
  }

  ToDate(event: any) {
    let toDate = event.year + '-' + event.month + '-' + event.day;
    this.to = toDate;
    this.getOrders(1);
  }
  Restaurant_id: any;
  IsRestChange(event: any) {
    let restaurant_id = event.target.value
    // if (restaurant_id === 'undefined') {
    //   this.from = undefined;
    //   this.to = undefined;
    // }
    this.Restaurant_id = restaurant_id;
    this.getOrders(1);
    this.currentPage = 1;
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get(`order/?restaurant_id=` + restaurant_id + `&status=` + this.Status, null,{ params: params }).subscribe((res: any) => {
    // //  console.log(res)
    //   const responseData = res;
    //   this.customers = responseData.data.order;
    //   this.totalItems = responseData.data.count;
    //   this.loading = false;
    //   if (this.customers.length === 0) {
    //     this.toastr.warning("No Record Found");
    //   }
    // });
  }

  Status: any;
  IsStatusChange(event: any) {
    let status = event.target.value
    this.Status = status;
    this.getOrders(1);
    this.currentPage = 1;
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get(`order/?restaurant_id=` + this.Restaurant_id + `&status=` + this.Status, null,{ params: params }).subscribe((res: any) => {
    //   // console.log(res)
    //   const responseData = res;
    //   this.customers = responseData.data.order;
    //   this.totalItems = responseData.data.count;
    //   this.loading = false;
    //   if (this.customers.length === 0) {
    //     this.toastr.warning("No Record Found");
    //   }
    // });
  }

  // private getcustomer(page: number) {
  //   this.loading = true;
  //   let params = new HttpParams();
  //   params = params.append('page', page.toString())

  //   this.http.get(`order/?from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
  //     const responseData = res;
  //     this.customers = responseData.data.order;
  //     this.totalItems = responseData.data.count;
  //     this.loading = false;
  //     if (this.customers.length === 0) {
  //       this.toastr.warning("No Record Found");
  //     } 
  //   });
  // }
  PageJump: any = 10;
  PageTotalNumber: any = [];
  private getOrders(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';
    if(page === 0){
      page = 1;
    }
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`order/?search=${search}` + `&restaurant_id=` + this.Restaurant_id + `&status=` + this.Status + `&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.customers = responseData.data.order;
      // this.StatusName = responseData.data.order[0].status[0].status.name;
      this.totalItems = responseData.data.count;
      this.loading = false;

      this.PageTotalNumber = [];
      let Count = responseData.data.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumber.push(i);
      }
      if (this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  Today() {
    let fromDate = new Date();
    this.from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getOrders(1);
    // this.GetExportDashboard(1);
    this.loading = true;
  }
  days7() {
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setDate(from.getDate() - 6);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getOrders(1);
    // this.GetExportDashboard(1);
    this.loading = true;
  }
  days15() {
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setDate(from.getDate() - 14);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getOrders(1);
    // this.GetExportDashboard(1);
    this.loading = true;
  }
  days30() {
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setMonth(from.getMonth() - 1);
    from.setDate(from.getDate() + 1);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate());
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getOrders(1);
    // this.GetExportDashboard(1);
  }

  month6() {
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setMonth(from.getMonth() - 6);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getOrders(1);
    // this.GetExportDashboard(1);
  }
  year() {
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setFullYear(from.getFullYear() - 1);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getOrders(1);
    // this.GetExportDashboard(1);
  }


  onSubmit(formValue: any) {
    this.getOrders(1);
    this.restaurant = undefined;
    this.status = undefined
  }

  onPageChange(event: any, data: any) {
    if (data === '1') {
      this.currentPage = event;
      this.getOrders(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getOrders(this.currentPage)
    }
  }
  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'OrderList.xlsx' + new Date().getTime() + Excel_Extension);
  }

  ExportIsRangeDate(event: any) {
    this.IsExport = false;
    let dateRange = event.value;
    this.ExportFrom = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.ExportTo = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getOrderExport();
  }

  IsExport: any = true;
  ExportDaysFilter(event: any) {
    this.IsExport = false;
    if (event.target.value === '15') {
      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setDate(from.getDate() - 14);
      this.ExportFrom = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getOrderExport();
    } else if (event.target.value === '30') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setMonth(from.getMonth() - 1);
      this.ExportFrom = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getOrderExport();
    }
    else if (event.target.value === '6') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setMonth(from.getMonth() - 6);
      this.ExportFrom = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getOrderExport();
    }
    else if (event.target.value === '1') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setFullYear(from.getFullYear() - 1);
      this.ExportFrom = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getOrderExport();
    }
  }
  ExportCustomers: any = [];
  ExportFrom: any;
  ExportTo: any;
  getOrderExport() {
    this.http.get(`order/?export=true&from=` + this.ExportFrom + `&to=` + this.ExportTo, null).subscribe((res: any) => {
      const responseData = res;
      if (res.status === true) {
        this.ExportCustomers = responseData.data.order;
      } else {
        this.toastr.warning("No Record Found");
      }
    });
  }


}