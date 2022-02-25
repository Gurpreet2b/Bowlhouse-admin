import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  public loading = false;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  customers: any = [];
  total: any;
  orderhistory: any = [];
  public RestaurantChart: any;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    Mobile: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(private activeRoute: ActivatedRoute,
    private http: HttpService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.customer_id = this.activeRoute.snapshot.params['id'] || 0;
    this.getOrderHistory(1);
    this.getCustomers();
  }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getOrderHistory(event)
  }

  private getCustomers() {
    this.http.get(`customer/${this.customer_id}`).subscribe((res: any) => {
      const responseData = res;
      if (responseData.status === true) {
        this.customers = responseData.data;
      }
    })
  }

  CuisineDictionary: any;
  private getOrderHistory(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`customer/order/?customer_id=${this.customer_id}`, null, { params: params }).subscribe((res: any) => {
      this.loading = true;
      const responseData = res;
      if (responseData.status === true) {
        this.loading = false;
        this.total = responseData.data;
        this.orderhistory = responseData.data.orders;
        this.CuisineDictionary = responseData.data.cuisine_based_order_count;
        let RestaurantChart = responseData.data.cuisine_based_order_count;
        this.RestaurantChart = [];
        RestaurantChart.forEach((element: any) => {
          this.RestaurantChart.push({
                  'name': element.cuisine ,
                  "y": Number(element.count),  
                })
        });
        if (this.orderhistory.length === 0) {
          this.toastr.warning("No Record Found");
        }
      }
    });
  }
}
