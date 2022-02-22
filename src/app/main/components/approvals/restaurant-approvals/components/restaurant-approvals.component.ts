import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurant-approvals',
  templateUrl: './restaurant-approvals.component.html',
  styleUrls: ['./restaurant-approvals.component.css'],
})

export class RestaurantsApprovalsComponent implements OnInit {
  currentPage: number = 1;
  currentPageMenu: number = 1;
  currentPageCuisine: number = 1;
  currentPageCluster: number = 1;
  currentPageFoodCat: number = 1;
  currentPageCoupon: any = 1;
  currentPageOffer: any = 1;
  currentPageRestOffer: any = 1;
  RestaurantApprovals: any = [];
  MenuApprovals: any = [];
  CuisineApprovals: any = [];
  ClusterApprovals: any = [];
  FoodCatApprovals: any = [];
  CouponApprovals: any = [];
  OfferApprovals: any = [];
  RestOfferApprovals: any = [];
  totalItemsRest: any;
  totalItemsCuisine: any;
  totalItemsCluster: any;
  totalItemsFoodCat: any;
  totalItemsCoupon: any;
  totalItemsOffer: any;
  totalMenuItems: any;
  totalItemsRestOffer: any;
  row: any = [];
  public loading = false;
  IsUserName: any;
  public start: any;
  public end: any;
  from: any;
  to: any;
  IsActiveRestaurant: any = true;
  IsActiveMenu: any = '';
  IsActiveMaster: any = '';
  IsActiveCoupons: any = '';
  IsActiveOffers: any = '';
  IsActiveRestaurantOffers: any = '';


  constructor(
    private http: HttpService,
    private toastr: ToastrService, private dtPipe: DatePipe,
    private router: Router, private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.SetRestaurantName('Approval System - Helpdesk');
    this.IsUserName = this.authService.getUserName();
    let notification = this.activeRoute.snapshot.params['restaurant'] || 0;
    this.getApproval(1);
    if(notification === 'restaurant') {
      this.IsActiveRestaurant = true;
      this.IsRestaurantApproval();
    } else if (notification === 'menu') {
      this.IsActiveRestaurant = '';
      this.IsActiveMenu = true;
      this.IsMenuApproval();
    } else if (notification === 'master') {
      this.IsActiveRestaurant = '';
      this.IsActiveMaster = true;
      this.IsMasterApproval();
    } else if (notification === 'coupons') {
      this.IsActiveRestaurant = '';
      this.IsActiveCoupons = true;
      this.IsCouponsApproval();
    } else if (notification === 'offers') {
      this.IsActiveRestaurant = '';
      this.IsActiveOffers = true;
      this.IsOffersApproval();
    } else if (notification === 'restaurantOffers') {
      this.IsActiveRestaurant = '';
      this.IsActiveRestaurantOffers = true;
      this.IsRestaurantOffersApproval();
    } else {
      this.IsActiveRestaurant = true;
      this.IsRestaurantApproval();
    }
  }

  IsRestaurantApproval(){
    this.getApproval(1);
  }
  IsMenuApproval(){
    this.getMenuApproval(1);
  }
  IsMasterApproval(){
    this.getCuisineApproval(1);
  }
  IsClustersApproval(){
    this.getClustersApproval(1);
  }
  IsFoodCategoryApproval(){
    this.getFoodCatApproval(1);
  }
  IsCouponsApproval(){
    this.getCouponApproval(1);
  }
  IsOffersApproval(){
    this.getOfferApproval(1);
  }
  IsRestaurantOffersApproval(){
    this.getRestOfferApproval(1);
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
      this.getCouponApproval(1);
    } else if (event.target.value === '30') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setMonth(from.getMonth() - 1);
      this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getCouponApproval(1);
    }
    else if (event.target.value === '6') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setMonth(from.getMonth() - 6);
      this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getCouponApproval(1);
    }
    else if (event.target.value === '1') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setFullYear(from.getFullYear() - 1);
      this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.getCouponApproval(1);
    }
  }

  IsRangeDate(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getCouponApproval(1);
  }

  status: any;
  IsStatusChange(event: any) {
    this.loading = true;
    this.status = event.target.value;
    this.getCouponApproval(1);
  }

  onPageChange(event: any, data: any) {
    if (data === '1') {
      this.currentPage = event;
      this.getApproval(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getApproval(this.currentPage)
    }
  }

  PageJump: any = 10;
  PageTotalNumber: any = [];
  private getApproval(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('restaurant_approval/', null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.RestaurantApprovals = responseData.data.restaurants;
        this.totalItemsRest = res.data.count;
        this.loading = false;

        this.PageTotalNumber = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalNumber.push(i);
        }
      }
      this.loading = false;
    });
  }

  PageTotalRestOffer: any = [];
  private getRestOfferApproval(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get('coupons_approval/?restaurant=True', null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.RestOfferApprovals = responseData.data.coupons;
        this.totalItemsRestOffer = responseData.data.count;
        this.loading = false;

        this.PageTotalRestOffer = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalRestOffer.push(i);
        }
      }
      this.loading = false;
    });
  }

  onPageChangeRestOffer(event: any, data: any) {
    if (data === '1') {
      this.currentPageRestOffer = event;
      this.getRestOfferApproval(event)
    } else {
      this.currentPageRestOffer = Number(event.target.value);
      this.getRestOfferApproval(this.currentPageRestOffer)
    }
  }

  PageTotalNumberMenu: any = [];
  private getMenuApproval(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('foodmenu_approval/', null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.MenuApprovals = responseData.data.foodmenu;
        this.totalMenuItems = responseData.data.count;
        this.loading = false;

        this.PageTotalNumberMenu = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalNumberMenu.push(i);
        }
        // if(this.MenuApprovals.length === 0) {
        //   this.toastr.warning("No Record Found");
        // }
      }
      this.loading = false;
    });
  }

  onPageChangeMenu(event: any, data: any) {
    if (data === '1') {
      this.currentPageMenu = event;
      this.getMenuApproval(event)
    } else {
      this.currentPageMenu = Number(event.target.value);
      this.getMenuApproval(this.currentPageMenu)
    }
  }

  onPageChangeCoupon (event: any, data: any) {
    if (data === '1') {
      this.currentPageCoupon = event;
      this.getCouponApproval(event)
    } else {
      this.currentPageCoupon = Number(event.target.value);
      this.getCouponApproval(this.currentPageCoupon)
    }
  }

  PageTotalNumberCoupon: any = [];
  private getCouponApproval(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`coupons_approval/?status=` + this.status + `&from_date=` + this.from + `&to_date=` + this.to, null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.CouponApprovals = responseData.data.coupons;
        this.totalItemsCoupon = responseData.data.count;
        this.loading = false;
        this.PageTotalNumberCoupon = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalNumberCoupon.push(i);
        }
        // if(this.MenuApprovals.length === 0) {
        //   this.toastr.warning("No Record Found");
        // }
      }
      this.loading = false;
    });
  }

  
  onPageChangeOffer (event: any, data: any) {
    if (data === '1') {
      this.currentPageOffer = event;
      this.getOfferApproval(event)
    } else {
      this.currentPageOffer = Number(event.target.value);
      this.getOfferApproval(this.currentPageOffer)
    }
  }

  PageTotalFlashOffer: any = [];
  private getOfferApproval(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get('coupons_category_approval/', null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.OfferApprovals = responseData.data.coupons;
        this.totalItemsOffer = responseData.data.count;
        this.loading = false;

        this.PageTotalFlashOffer = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalFlashOffer.push(i);
        }
      }
      this.loading = false;
    });
  }

  
  PageTotalNumberCuisine: any = [];
  private getCuisineApproval(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('cuisine_approval/', null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.CuisineApprovals = responseData.data.cuisine;
        this.totalItemsCuisine = responseData.data.count;
        this.loading = false;

        this.PageTotalNumberCuisine = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalNumberCuisine.push(i);
        }
      }
    });
  }

  onPageChangeCuisine (event: any, data: any) {
    if (data === '1') {
      this.currentPageCuisine = event;
      this.getCuisineApproval(event)
    } else {
      this.currentPageCuisine = Number(event.target.value);
      this.getCuisineApproval(this.currentPageCuisine)
    }
  }

  PageTotalNumberCluster: any = [];
  private getClustersApproval(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('cluster_approval/', null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.ClusterApprovals = responseData.data.cuisine;
        this.totalItemsCluster = responseData.data.count;
        this.loading = false;

        this.PageTotalNumberCluster = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalNumberCluster.push(i);
        }
      }
    });
  }

  onPageChangeCluster (event: any, data: any) {
    if (data === '1') {
      this.currentPageCluster = event;
      this.getClustersApproval(event)
    } else {
      this.currentPageCluster = Number(event.target.value);
      this.getClustersApproval(this.currentPageCluster)
    }
  }

  PageTotalNumberCategory: any = [];
  private getFoodCatApproval(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('category_approval/', null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.FoodCatApprovals = responseData.data.cuisine;
        this.totalItemsFoodCat = responseData.data.count;
        this.loading = false;

        this.PageTotalNumberCategory = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalNumberCategory.push(i);
        }
      }
    });
  }

  onPageChangeFoodCat (event: any, data: any) {
    if (data === '1') {
      this.currentPageFoodCat = event;
      this.getFoodCatApproval(event)
    } else {
      this.currentPageFoodCat = Number(event.target.value);
      this.getFoodCatApproval(this.currentPageFoodCat)
    }
  }

  IsApproval(FoodId: any){
    this.loading = true;
    const formData = new FormData();
    this.http.post(`category_approval/${FoodId}/approved/`, formData).subscribe((res: any) => {
      this.loading = false;
      const responseData: any = res.data;
      if (responseData.status === true) {
        this.toastr.success('Food Category Approved Successfully !!');
        this.loading = false;
        this.getFoodCatApproval(1);
      } else {
        this.toastr.error(responseData.error);
        this.loading = false;
      }
    });
  }

  FoodId: any;
  IsSelectDiscard(FoodId: any){
   this.FoodId = FoodId;
  }

  comment: any;
  IsDiscard(){
    if(this.comment === '' || this.comment === undefined || this.comment === null){
      this.toastr.warning('Please enter reason for Food Category discard');
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('approved_status', 'REJECTED');
    formData.append('discard_message', this.comment);
    this.http.patch(`category_approval/${this.FoodId}/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success('Food Category Discard Successfully');
        this.onFoodCategoryDismiss();
        this.router.navigateByUrl(`/restaurant-approvals`);
        this.loading = false;
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    });
  }

  onFoodCategoryDismiss() {
    const target = "#DiscardModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }
}
