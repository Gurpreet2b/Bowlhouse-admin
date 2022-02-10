import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangerefundComponent } from '@main/components/refund/changerefund/components/changerefund.component';
import { PaymentdoneComponent } from '@main/components/paymentdone/components/paymentdone.component';
import * as xlsx from 'xlsx';
const Excel_Extension ='.xlsx';

@Component({
  selector: 'app-adminrefund',
  templateUrl: './adminrefund.component.html',
  styleUrls: ['./adminrefund.component.css']
})
export class AdminrefundComponent implements OnInit {
  @ViewChild('epltable', { static: false })
  epltable!: ElementRef;
  public start: any;
  public end: any;

  public loading = false;
  customers: any = [];
  detail: any = [];
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  model: any;
  model1: any;
  lastthirt: any;
  isDisabled: boolean | undefined;
  empList: any;
  TotalSum: any = 0;
  transaction: any = [];
  PAID: any;
  UNPAID: any;
  INITIATED: any;
  status: any;
  restaurant: any;
  public isCollapsed = true;
  // from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

  // toDate = new Date(new Date().getTime() - 3600 * 60 * 60 * 1000);
  // to = this.dtPipe.transform(this.toDate, 'yyyy-MM-dd');
  from: any;
  to: any;
  lastdate: any;
  category: any = [];
  refundable_amount: any;
  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe, private authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName(`Refund Management`); 
    this.getCustomerById(1);
    this.getCategory();
    this.isDisabled = true;
  }

  ApprovalInitiated(refundId: any){
    this.loading = true;
    const formData = new FormData();
    formData.append('status', 'INITIATED');

    this.http.put(`refund/${refundId}/`, formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true) {
        this.toastr.success("Refund Initiated Successfully !!");
        this.getCustomerById(1);
      } else {
        this.toastr.warning("Something went wrong !!");
      }
    });
  }

  IsRangeDate(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getCustomerById(1);
    this.currentPage = 1;
  }
  private getCategory() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.category = responseData.data.restaurant;
    })
  }
  IsRestChange(event: any) {
    this.loading = true;
    this.restaurant = event.target.value;
    this.getCustomerById(1);
    this.currentPage = 1;
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get(`refund/?restaurant_id=` + restaurant, null, { params: params }).subscribe((res: any) => {
    //   // console.log(res)
    //   const responseData = res;
    //   this.customers = responseData.data.refund;
    //   this.totalItems = responseData.data.count;
    //   this.loading = false;
    //   if (this.customers.length === 0) {
    //     this.toastr.warning("No Record Found");
    //   }
    // });
  }


  IsStatusChange(event: any) {
    this.loading = true;
    this.status = event.target.value;
    this.getCustomerById(1);
    this.currentPage = 1;
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get(`refund/?status=` + status, null, { params: params }).subscribe((res: any) => {
    //   const responseData = res;
    //   this.customers = responseData.data.refund;
    //   this.totalItems = responseData.data.count;
    //   this.loading = false;
    //   if (this.customers.length === 0) {
    //     this.toastr.warning("No Record Found");
    //   }
    // });
  }

  lastDays(event: any) {
    if (event.target.value === '15') {
      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setDate(from.getDate() - 14);
      this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');


      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getByDate(1);
    } else if (event.target.value === '30') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setMonth(from.getMonth() - 1);
      this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getByDate(1);
    }
    else if (event.target.value === '6') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setMonth(from.getMonth() - 6);
      this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getByDate(1);
    }
    else if (event.target.value === '1') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setFullYear(from.getFullYear() - 1);
      this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getByDate(1);
    }

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

  private getByDate(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`refund/?from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      // console.log(res)
      const responseData = res;
      this.customers = responseData.data.refund;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if (this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  onCreate() {
    this.paymentId = [];
    for (let i = 0; i < this.IsCheckLength.length; i++) {
      const element = this.IsCheckLength[i];
      this.paymentId.push(element.id);
    }

    const params = {
      refundable_amount: this.TotalSum,
      restaurant: this.restaurant_id,
      id: this.paymentId,
      IsCheckData: this.IsCheckLength
    }
    const modalRef = this.modalService.open(PaymentdoneComponent);
    modalRef.componentInstance.PaymentData = params;
    // window.location.reload();
  }

  // private getcustomers(page: number) {
  //   this.loading = true;
  //   let params = new HttpParams();
  //   params = params.append('page', page.toString())

  //   this.http.get(`restaurant_payment/?restaurant_id=${this.restaurant_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
  //     const responseData = res;
  //     console.log(res)
  //     let customers = responseData.data.payment;
  //     this.totalItems = responseData.data.count;
  //     this.loading = false;
  //     for (let i = 0; i < customers.length; i++) {
  //       const element = customers[i];
  //       element.isCheck = false;
  //       this.customers.push(element);
  //     }
  //     this.detail = responseData.data.payment[0].restaurant;


  //   });
  // }
  onChangeValue(val: any, item: any) {
    item.refundable_amount = Number(val.target.value);
    if (this.isCheck === true) {
      this.onKeyUpDays();
    }
  }

  isCheck = false;
  CalculateData: any
  paymentId: any[] = [];
  IsCheckLength: any[] = [];
  IsCalculation(item: any) {
    if (item.isCheck === true) {
      // this.CalculateData = this.customers.filter((x: any) => x.order === item.order);
      item.isChecked = true;
      // this.paymentId.push(item.id);
      this.onKeyUpDays();
      this.IsCheckLength = this.customers.filter((x: any) => x.isCheck === true);
    } else {
      this.TotalSum = this.TotalSum - item.refundable_amount
      this.IsCheckLength = this.customers.filter((x: any) => x.isCheck === true);
    }

  }

  onKeyUpDays() {
    let sum: Number = 0;
    for (var i = 0; i < this.customers.length; i++) {
      const element = this.customers[i];
      if (element.isCheck === true) {
        sum += this.customers[i].refundable_amount;
      }
    }
    this.TotalSum = sum;
  }
  getCustomerById(page: number) {
    this.loading = true;
    // let status = 'INITIATED';
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`refund/?from=` + this.from + `&to=` + this.to + `&restaurant_id=` + this.restaurant + `&status=` + this.status,  null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.customers = responseData.data.refund;
      this.totalItems = responseData.data.count;
      this.loading = false;
      // for (let i = 0; i < customers.length; i++) {
      //   const element = customers[i];
      //   element.isCheck = false;
      //   this.customers.push(element);
      // }
      // this.detail = responseData.data.payment[0].restaurant;
      // console.log(this.detail)


    });
  }


  onPageChange(event: number) {
    this.currentPage = event;
    this.getCustomerById(event)
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'RefundList.xlsx' + new Date().getTime() + Excel_Extension);
   }


}


