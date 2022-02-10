import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';
const Excel_Extension ='.xlsx';
@Component({
  selector: 'app-issue-payment',
  templateUrl: './issue-payment.component.html',
  styleUrls: ['./issue-payment.component.css']
})
export class IssuePaymentComponent implements OnInit {
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
  public start: any;
  public end: any;
  IsUserName: any;
  
  // date = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');
  form = new FormGroup({
    search: new FormControl(''),
  });
  constructor(private http: HttpService,
    private toastr: ToastrService, private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName(`BowlHouse Transactions To Restaurants`); 
    this.getcustomers(1);
    this.getCategory();
    let UserName = this.authService.getUserName();
    this.IsUserName = UserName;
  }



  private getCategory() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.category = responseData.data.restaurant;
    })
  }

  IsRangeDate(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getcustomer(1);
    this.currentPage = 1;
  }
  FromDate(event: any) {
    let fromDate = event.year + '-' + event.month + '-' + event.day;
    this.from = fromDate;
  }

  ToDate(event: any) {
    let toDate = event.year + '-' + event.month + '-' + event.day;
    this.to = toDate;
    this.getcustomer(1);
    this.currentPage = 1;
  }

  RestaurantId: any;
  IsRestChange(event: any) {
    let restaurant = event.target.value;
    this.RestaurantId = restaurant;
    this.getcustomers(1);
    this.currentPage = 1;
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get(`restaurant_transaction/?restaurant_id=` + restaurant, null,{ params: params }).subscribe((res: any) => {
    //  console.log(res)
    //   const responseData = res;
    //   this.customers = responseData.data.transactions;
    //   this.totalItems = responseData.data.count;
    //   this.loading = false;
    //   if (this.customers.length === 0) {
    //     this.toastr.warning("No Record Found");
    //   }
    // });
  }
  Status: any;
  IsStatusChange(event: any) {
    this.Status = event.target.value
    this.getcustomers(1);
    this.currentPage = 1;
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get(`restaurant_transaction/?status=` + status, null,{ params: params }).subscribe((res: any) => {
    //   // console.log(res)
    //   const responseData = res;
    //   this.customers = responseData.data.transactions;
    //   this.totalItems = responseData.data.count;
    //   this.loading = false;
    //   if (this.customers.length === 0) {
    //     this.toastr.warning("No Record Found");
    //   }
    //   //  else {
    //   //   this.toastr.success("Detail List");
    //   // }
    // });
  }

  private getcustomer(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`restaurant_transaction/?from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.customers = responseData.data.transactions;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if (this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      } 
      // else {
      //   this.toastr.success("Detail List");
      // }
    });
  }

  private getcustomers(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`restaurant_transaction/?restaurant_id=` + this.RestaurantId + `&status=` + this.Status + `&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.customers = responseData.data.transactions;
      console.log(this.customers)
      this.totalItems = responseData.data.count;
      this.loading = false;
      if (this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      } 
      // else {
      //   this.toastr.success("Transaction List");
      // }
    });
  }


  onSubmit(formValue: any) {
    this.getcustomers(1);
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getcustomers(event)
  }
  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'TransactionToRestaurants.xlsx' + new Date().getTime() + Excel_Extension);
   }
  
   
  }