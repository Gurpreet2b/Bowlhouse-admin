import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangestatusComponent } from '../changestatus/components/changestatus.component';


@Component({
  selector: 'app-helppayment',
  templateUrl: './helppayment.component.html',
  styleUrls: ['./helppayment.component.css']
})
export class HelppaymentComponent implements OnInit {

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
  // from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

  // toDate = new Date(new Date().getTime() - 3600 * 60 * 60 * 1000);
  // to = this.dtPipe.transform(this.toDate, 'yyyy-MM-dd');
  from: any;
  to: any;
  lastdate: any;
  category: any = [];
  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe, private authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName(`Cash on Delivery Management`); 
    this.getCustomerById(1);
    this.getCategory();
    this.isDisabled = true;
  }
  IsRangeDate(event: any) {
    let dateRange = event.value;
    if(dateRange === null){
      this.from = undefined;
      this.to = undefined;
      this.getByDate(1);
    } else {
      this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
      this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
      this.getByDate(1);
    }
  }
  private getCategory() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.category = responseData.data.restaurant;
    })
  }
  IsRestChange(event: any) {
    this.loading = true;
    let restaurant = event.target.value
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`payment/?restaurant_id=` + restaurant, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.customers = responseData.data.payment;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if (this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }


  IsStatusChange(event: any) {
    this.loading = true;
    let status = event.target.value
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`payment/?status=` + status, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.customers = responseData.data.payment;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if (this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
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
    this.http.get(`payment/?from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.customers = responseData.data.payment;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if (this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  onCreate() {
    const params = {
      amount: this.TotalSum,
      restaurant: this.restaurant_id,
      id: this.paymentId,
      IsCheckData: this.IsCheckLength
    }
    const modalRef = this.modalService.open(ChangestatusComponent);
    modalRef.componentInstance.PaymentData = params;
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
    item.amount = Number(val.target.value);
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
      this.paymentId.push(item.id);
      this.onKeyUpDays();
      this.IsCheckLength = this.customers.filter((x: any) => x.isCheck === true);
    } else {
      this.TotalSum = this.TotalSum - item.amount
      this.IsCheckLength = this.customers.filter((x: any) => x.isCheck === true);
    }

  }

  onKeyUpDays() {
    let sum: Number = 0;
    for (var i = 0; i < this.customers.length; i++) {
      const element = this.customers[i];
      if (element.isCheck === true) {
        sum += this.customers[i].amount;
      }
    }
    this.TotalSum = sum;
  }
  getCustomerById(page: number) {
    debugger
    this.loading = true;
    let status = 'PAID_ON_DELIVERY';
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`payment/?status=` + status, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.customers = responseData.data.payment;
      this.totalItems = responseData.data.count;
      this.loading = false;
      this.getCustomers(1)
      // for (let i = 0; i < customers.length; i++) {
      //   const element = customers[i];
      //   element.isCheck = false;
      //   this.customers.push(element);
      // }
      // this.detail = responseData.data.payment[0].restaurant;
      // console.log(this.detail)


    });
  }
  getCustomers(page: number) {
    this.loading = true;
    let status = 'PAID_ON_DELIVERY';
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`payment/?status=` + status, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.customers = responseData.data.payment;
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

}


