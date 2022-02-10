import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-final-payment',
  templateUrl: './final-payment.component.html',
  styleUrls: ['./final-payment.component.css']
})
export class FinalPaymentComponent implements OnInit {

  public loading = false;
  customers: any = [];
  detail: any = [];
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  model: any;
  model1: any;
  isDisabled: boolean | undefined;
  empList: any;
  TotalSum: any;
  transaction: any = [];
  PAID: any;
  UNPAID: any;
  INITIATED: any;
  status: any;
  form = new FormGroup({
    // name: new FormControl('', [Validators.required]),
  });

  @Input() PaymentData: any;
  @Output() valueChange = new EventEmitter();
  from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

  toDate = new Date(new Date().getTime() - 3600 * 60 * 60 * 1000);
  to = this.dtPipe.transform(this.toDate, 'yyyy-MM-dd');

  lastdate: any;
  id: any;
  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.PaymentData)
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.getCustomerById(1);
    this.isDisabled = true;
  }

  private getcustomers(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`restaurant_payment/?restaurant_id=${this.restaurant_id}&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.customers = responseData.data.payment;
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
  getCustomerById(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`restaurant_payment/?restaurant_id=${this.restaurant_id}`, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      let customers = responseData.data.payment;
      this.totalItems = responseData.data.count;
      for (let i = 0; i < customers.length; i++) {
        const element = customers[i];
        element.isCheck = false;
        this.customers.push(element);
      }
      // this.detail = responseData.data.payment[0].restaurant;
      console.log(this.detail)

    });
  }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getCustomerById(event)
  }
  onDeleteRestaurant(id: number) {
    this.http.delete(`customers/${id}`).subscribe((res: any) => {
      this.getcustomers(this.currentPage)
    });
  }
  onSubmit() {

    const dataToSubmit = {
      ...this.form.value, 
      // restaurant: String(this.PaymentData.restaurant_id),
      restaurant: this.PaymentData.restaurant,
      total_payable_amount: this.PaymentData.total_payable_amount,
      payment_id_list: this.PaymentData.payment_id_list,
      status: 'INITIATED',
      total_amount: this.PaymentData.total_amount
    };


    const formData = new FormData();

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });
    console.log(dataToSubmit)
    this.loading = true;
    this.http.post('restaurant_transaction/', formData)
      .subscribe(data => {
        const responseData: any = data;
        if (responseData.status === true) {
          this.toastr.success('Payment Done');
          this.loading = false;
          // this.onDismiss();
          this.router.navigate(['/transactions/orderlist/' ,responseData.data.id]);
          this.onDismiss();
        } else {
          this.toastr.error(responseData.error);
          this.loading = false;
        }
      },
        error => {
          this.loading = false;
        });
  }

  onDismiss() {
    this.modalService.dismissAll();
  }

}



