import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinalPaymentComponent } from '../../final-payment/components/final-payment.component';
@Component({
  selector: 'app-outstanding',
  templateUrl: './outstanding.component.html',
  styleUrls: ['./outstanding.component.css']
})
export class OutstandingComponent implements OnInit {
  public start: any;
  public end: any;

  public loading = false;
  BoughtService: any = [];
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
    // this.auth.SetRestaurantName(`Bought Services`); 
    this.getBoughtServices(1);
    let UserName = this.auth.getUserName();
    this.IsUserName = UserName;
  }
 
  PageJump: any = 10;
  PageTotalNumber: any = [];
  private getBoughtServices(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`restaurant_bought_services/?restaurant_id=${this.restaurant_id}`, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.loading = false;
      this.BoughtService = responseData.data.featured_restaurant_service;
      this.auth.SetRestaurantName(this.BoughtService[0].restaurant.name); 
      this.totalItems = responseData.data.featured_restaurant_service.length;
      this.PageTotalNumber = [];
      let Count = responseData.data.featured_restaurant_service.length / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumber.push(i);
      }
      if (this.BoughtService.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

 
  onPageChange(event: any, data: any) {
    if(data === '1'){
      this.currentPage = event;
      this.getBoughtServices(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getBoughtServices(this.currentPage)
    }  
  }

}


