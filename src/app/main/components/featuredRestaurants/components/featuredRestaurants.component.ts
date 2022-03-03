import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';
const Excel_Extension = '.xlsx';
@Component({
  selector: 'app-featuredRestaurants',
  templateUrl: './featuredRestaurants.component.html',
  styleUrls: ['./featuredRestaurants.component.css']
})
export class FeaturedRestaurantsComponent implements OnInit {
  @ViewChild('epltable', { static: false })
  epltable!: ElementRef;
  PAID: any;
  UNPAID: any;
  INITIATED: any;
  status: any;
  restaurant: any;
  public loading = false;
  FeaturedRestaurants: any = [];
  UpComingFeaturedRestaurants: any = [];
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: any;
  from: any;
  to: any;
  model: any;
  model1: any;
  category: any = [];
  statuslist: any = [];
  public start: any;
  public end: any;

  // date = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');
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
    this.authService.SetRestaurantName();
    this.getFeaturedRestaurants();
    this.getCategory();
  }

  ValueChanged(position: any) {
    if (position === 'position') {
      this.getFeaturedRestaurants();
    }
  }

  private getCategory() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.category = responseData.data.restaurant;
    })
  }

  getFeaturedRestaurants() {
    this.loading = true;
    this.http.get(`featured_restaurant_list`, null,).subscribe((res: any) => {
      const responseData = res;
      this.FeaturedRestaurants = responseData.data;
      this.totalItems = responseData.count;
      this.loading = false;

      if (this.FeaturedRestaurants.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  getUpComingFeaturedRestaurants() {
    this.loading = true;
    this.http.get(`featured_restaurant/upcoming`, null,).subscribe((res: any) => {
      const responseData = res;
      this.UpComingFeaturedRestaurants = responseData.data.featured_restaurant;
      this.totalItems = responseData.count;
      this.loading = false;

      if (this.FeaturedRestaurants.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

}