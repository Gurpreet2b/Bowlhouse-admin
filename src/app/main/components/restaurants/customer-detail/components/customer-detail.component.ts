import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  
  order_id: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  orders: any[] = [];
  id: number | null = null;
  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.order_id = this.activeRoute.snapshot.params['id'] || 0;

    console.log(this.order_id)
    this.getOrderHistory(1)
  }
 
 
  detailsData: any;
  private getOrderHistory(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`order/${this.order_id}`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      console.log(res)
      this.orders = responseData.data.inorder;
      this.detailsData = responseData.data;
      this.totalItems = responseData.data.count;
    });
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getOrderHistory(event)
  }

  onDeleteMenuItem(id: number) {
    this.http.delete(`foodmenu/${id}/`).subscribe((res: any) => {
      this.getOrderHistory(this.currentPage)
    });
  }

}