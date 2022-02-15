import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';
const Excel_Extension = '.xlsx';
@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.css']
})
export class PendingOrderComponent implements OnInit {
  
  public loading = false;
  customers: any = [];
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  today= new Date();
  Status: any = 'PLACED';
  RestaurantList: any = [];
  public ClusterList: any = [];
  ClusterId: any;
  RestaurantId: any;
  public DriverDetail: any;

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
    this.authService.SetRestaurantName(`These listed order are not Accepted yet`);
    this.getOrders(1);
    this.getRestaurant();
    this.getCluster();
    // setInterval(() => {
    //   this.getOrders(1); 
    //   }, 30000);
  }

  private getRestaurant() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.RestaurantList = responseData.data.restaurant;
    })
  }

  IsDriverData(driver: any){
    this.DriverDetail = driver;
  }

  IsRestChange(event: any) {
    this.RestaurantId = event.target.value;
    this.getOrders(1);
    this.currentPage = 1;
  }

  private getCluster() {
    this.http.get(`cluster/`).subscribe((res: any) => {
      const responseData = res;
      this.ClusterList = responseData.data.cluster;
    })
  }

  OnChangeCluster(event: any) {
    this.ClusterId = event.target.value;
  }

  PageJump: any = 10;
  PageTotalNumber: any = [];
  from: any;
  to: any;
  private getOrders(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';
    if(page === 0){
      page = 1;
    }
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`order/?search=${search}` + `&restaurant_id=` + this.RestaurantId + `&status=${this.Status}` + `&live=true`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      if(res.status === true){
        this.customers = responseData.data.order;
        this.totalItems = responseData.data.count;
        this.loading = false;
        
      } else {
        this.loading = false;
        this.toastr.warning("Something went wrong !!");
      }
      this.PageTotalNumber = [];
      let Count = responseData.data.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumber.push(i);
      }
    },(error: any) =>{
      this.loading = false;
      this.toastr.warning(error.message);
    });
  }

  onSubmit(formValue: any) {
    this.getOrders(1);
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

  PendingOrder(Placed: any) {
    this.authService.SetRestaurantName(`These listed order are not Accepted yet`);
    this.Status = Placed;
    this.getOrders(1);
  }

  // PlacedOrder() {
  //   this.authService.SetRestaurantName(`Placed Order`);
  // }

  AcceptedOrder(accepted: any) {
    this.authService.SetRestaurantName(`These listed order are not Ready yet`);
    this.Status = accepted;
    this.getOrders(1);
  }

  ReadyOrder(ready: any) {
    this.authService.SetRestaurantName(`These listed order are not PickedUp yet`);
    this.Status = ready;
    this.getOrders(1);
  }

  PickupOrder(PickUp: any) {
    this.authService.SetRestaurantName(`These listed order are not Delivered yet`);
    this.Status = PickUp;
    this.getOrders(1);
  }

}