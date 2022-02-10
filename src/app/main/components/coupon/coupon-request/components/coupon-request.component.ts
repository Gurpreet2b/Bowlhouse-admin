import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EditCouponComponent } from '../../edit-coupon/components/edit-coupon.component';
// import { CreateCuisineComponent } from '../../create-cuisine/components/create-cuisine.component';
// import { EditCuisineComponent } from '../../edit-cuisine/components/edit-cuisine.component';

@Component({
  selector: 'app-coupon-request',
  templateUrl: './coupon-request.component.html',
  styleUrls: ['./coupon-request.component.css'],
})

export class CouponRequestComponent implements OnInit {
  currentPage: number = 1;
  CouponRequest: any = [];
  totalItems: number | undefined;
  cuisine_id: number | null = null;
  id: number | null = null;
  row: any = [];
  public loading = false;  

  constructor(private modalService: NgbModal,
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router,private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cuisine_id = this.activeRoute.snapshot.params['id'];
    this.authService.SetRestaurantName(); 
    console.log(this.cuisine_id)
    this.getCouponRequest(1);
  }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getCouponRequest(event)
  }

  private getCouponRequest(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('restaurant_coupon_request/', null, { params: params }).subscribe((res: any) => {
      if(res.status === true){
        const responseData = res;
        this.CouponRequest = responseData.data.restaurant_coupon_request;
        this.totalItems = responseData.data.count;
        this.loading = false;
        if(this.CouponRequest.length === 0) {
          this.toastr.warning("No Record Found");
        }
        //  else {
       //   this.toastr.success("CouponRequest List");
        // }
        console.log(res.data)
      } 
      
    });
  }

}

