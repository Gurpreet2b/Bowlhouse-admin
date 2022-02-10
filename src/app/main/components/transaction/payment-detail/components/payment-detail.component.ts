import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinalPaymentComponent } from '../../final-payment/components/final-payment.component';
@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
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
  TotalVat: any = 0;
  TotalDel: any = 0;
  CommissionTotal: any = 0;
  transaction: any = [];
  PAID: any;
  UNPAID: any;
  INITIATED: any;
  status: any;
  public IsRange = false;
  OutStandingAmount: any;

  // from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

  // toDate = new Date(new Date().getTime() - 3600 * 60 * 60 * 1000);
  // to = this.dtPipe.transform(this.toDate, 'yyyy-MM-dd');
  from: any;
  to: any;
  lastdate: any;
  IsUserName: any;
  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe,
    private auth: AuthService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.auth.SetRestaurantName(`Payment`); 
    this.Today();
    this.isDisabled = true;
    let UserName = this.auth.getUserName();
    this.IsUserName = UserName;
  }
  IsRangeDate(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getByDate(1);
  }

  Status: any;
  IsStatusChange(event: any) {
    let status = event.target.value;
    this.Status = status;
    this.currentPage = 1;
    this.getByDate(1);
    // let params = new HttpParams();
    // params = params.append('page', '1')
    // this.http.get(`restaurant_payment/?restaurant_id=${this.restaurant_id}&status=` + status, null, { params: params }).subscribe((res: any) => {
    //   const responseData = res;
    //   this.customers = responseData.data.payment;
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

  lastDays(event: any) {
    if (event.target.value === '15') {
      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setDate(from.getDate() - 15);
      this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');


      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getByDate(1);
    } else {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setDate(from.getDate() - 30);
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
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`restaurant_payment/?restaurant_id=${this.restaurant_id}&status=` + this.Status + `&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.loading = false;
      this.customers = responseData.data.payment;
      this.OutStandingAmount = responseData.data.total_outstandint_amount;
      this.totalItems = responseData.data.count;
      this.detail = responseData.data.payment[0].restaurant;
      this.auth.SetRestaurantName(`Payment to ${this.detail.name}`); 
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
      total_amount: this.TotalSum,
      total_payable_amount: this.TotalPayable,
      restaurant: this.restaurant_id,
      payment_id_list: this.paymentId,
      IsCheckData: this.IsCheckLength,
      commission: this.CommissionTotal,
      tax_percent: this.TotalVat,
      delivery_charge: this.TotalDel
    }
    const modalRef = this.modalService.open(FinalPaymentComponent);
    modalRef.componentInstance.PaymentData = params;
  }

  private getcustomers(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`restaurant_payment/?restaurant_id=${this.restaurant_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      console.log(res)
      let customers = responseData.data.payment;
      this.totalItems = responseData.data.count;
      this.loading = false;
      for (let i = 0; i < customers.length; i++) {
        const element = customers[i];
        element.isCheck = false;
        this.customers.push(element);
      }
      this.detail = responseData.data.payment[0].restaurant;
      this.auth.SetRestaurantName(`Payment to ${this.detail.name}`); 

    });
  }
  onChangeValue(val: any, item: any) {
    item.payable_amount = Number(val.target.value);
    item.commission = Number(val.target.value);
    item.tax_percent = Number(val.target.value);
    item.delivery_charge = Number(val.target.value);
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
      this.IsCheckLength = this.customers.filter((x: any) => x.isCheck ===  true);
    } else {
      this.CommissionTotal = this.CommissionTotal - item.order.commission
      // this.TotalVat = this.TotalVat - item.order.tax_percent
      this.TotalDel = this.TotalVat - item.order.delivery_charge
      this.TotalSum = this.TotalSum - item.order_amount
      this.TotalPayable = this.TotalPayable - item.payable_amount
      this.IsCheckLength = this.customers.filter((x: any) => x.isCheck ===  true);
    }

  }

  TotalPayable: any = 0;
  onKeyUpDays() {
    let Totalsum: Number = 0;
    let sum: Number = 0;
    let comm: Number = 0;
    let vat: Number = 0;
    let del: Number = 0;
    for (var i = 0; i < this.customers.length; i++) {
      const element = this.customers[i];
      if (element.isCheck === true) {
        Totalsum += this.customers[i].order_amount;
        sum += this.customers[i].payable_amount;
        comm += this.customers[i].order.commission;
        vat = this.customers[i].order.tax_percent;
        del += this.customers[i].order.delivery_charge;

      }
    }
    this.TotalSum = Totalsum;
    this.TotalPayable = sum;
    this.CommissionTotal = comm;
    this.TotalVat = vat;
    this.TotalDel = del;
  }

  PageJump: any = 10;
  PageTotalNumber: any = [];
  getCustomerById(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`restaurant_payment/?restaurant_id=${this.restaurant_id}`, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      let customers = responseData.data.payment;
      this.totalItems = responseData.data.count;
      this.loading = false;
      this.customers = [];
      for (let i = 0; i < customers.length; i++) {
        const element = customers[i];
        element.isCheck = false;
        this.customers.push(element);
      }
      this.PageTotalNumber = [];
      let Count = responseData.data.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumber.push(i);
      }
      this.detail = responseData.data.payment[0].restaurant;
      this.auth.SetRestaurantName(`Payment to ${this.detail.name}`); 
      // console.log(this.detail)


    });
  }

  onPageChange(event: any, data: any) {
    if(data === '1'){
      this.currentPage = event;
      this.getByDate(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getByDate(this.currentPage)
    }  
  }

  onDeleteRestaurant(id: number) {
    this.http.delete(`customers/${id}`).subscribe((res: any) => {
      this.getcustomers(this.currentPage)
    });
  }

  Today() {
    this.IsRange = false;
    let fromDate = new Date();
    this.from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getByDate(1);
    
    this.loading = true;
  }
  days7() {
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setDate(from.getDate() - 6);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getByDate(1);
    
    this.loading = true;
  }
  days15() {
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setDate(from.getDate() - 14);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getByDate(1);
    
    this.loading = true;
  }
  days30() {
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setMonth(from.getMonth() - 1);
    from.setDate(from.getDate() + 1);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate());
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getByDate(1);
    
  }

  month6() {
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setMonth(from.getMonth() - 6);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getByDate(1);
    
  }
  year() {
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setFullYear(from.getFullYear() - 1);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getByDate(1);
    
  }

  DateRange(){
    this.IsRange = true;
  }

}


