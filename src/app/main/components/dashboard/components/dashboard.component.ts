import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { Chart } from 'angular-highcharts';
import { areaChartOptions } from 'app/helpers/areaChartOptions';
import { donutChartOptions } from 'app/helpers/donutChartOptions';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';
const Excel_Extension ='.xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('epltable', { static: false })
  epltable!: ElementRef;
  @ViewChild('epltable1', { static: false })
  epltable1!: ElementRef;
  donutChart = new Chart(donutChartOptions);
  areaSplineChart = new Chart(areaChartOptions);
  donutChart1 = new Chart(donutChartOptions);
  areaSplineChart1 = new Chart(areaChartOptions);
  public start: any;
  public end: any;
  public loading = false;
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  restaurants: any = [
  ];
  category: any = [];
  from: any;
  toDate: any;
  to: any;
  fromDate: any;
  alldata: any = [];
  customers: any = [];
  RestaurantId: any;
  RestaurantIdExport: any;
  ExportData: any;
  RestaurantCuisineChart: any[] = [];
  public RestaurantChart: any;
  public ChartOrderAmount: any;
  public ChartOrderCount: any;
  public ActiveData: any;
  public InActiveData: any;
  public IsRange = false;
  public BreakFastData: any;
  public LunchData: any;
  public SnacksData: any;
  public DinnerData: any;
  public LateNightData: any;
  public ClusterList: any = [];
  public UserName: any;
  public RoleName: any;
  public FilterDate: any = 'Today';
  public NewSubscriptionsList: any = [];
  public RenewalSubscriptionsList: any = [];
  public SubscriptionsList: any = [];
  
  form = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private dtPipe: DatePipe,
    private authService: AuthService) {
  }


  ngOnInit(): void {
    this.authService.SetRestaurantName(`DASHBOARD`); 
    this.UserName = this.authService.getUserName();
    this.RoleName = this.authService.getRoleName();
    this.GetExportDashboard(1);
    this.getData(1);
    this.getactive(1);
    this.getCategory()
    this.getCluster();
  }
  
  private getCategory() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.category = responseData.data.restaurant;
    })
  }

  private getCluster() {
    this.http.get(`cluster/`).subscribe((res: any) => {
      const responseData = res;
      this.ClusterList = responseData.data.cluster;
    })
  }
  IsRangeDate(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getData(1);
    // this.GetExportDashboard(1);
  }
  IsRestChange(event: any) {
    let restaurant = event.target.value
    this.RestaurantIdExport = restaurant;
    this.getData(1);
    // this.GetExportDashboard(1);
    let params = new HttpParams();
    params = params.append('page', '1')
    this.http.get(`restaurant_transaction/?restaurant_id=` + restaurant, null,{ params: params }).subscribe((res: any) => {
     console.log(res)
      const responseData = res;
      this.customers = responseData.data.transactions;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if (this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  private getactive(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`restaurant/active/`, null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.ActiveData = responseData.data;
        this.InActiveData = this.ActiveData.total - this.ActiveData.active
        this.loading = false;
        // console.log(res.data)
      }
    });
  }

  OnChangeCluster(event: any){
    this.ClusterId = event.target.value;
    this.getData(1);
  }

  IsNewSubscriptions(){
    this.SubscriptionsList = this.NewSubscriptionsList;
    this.IsSubName = 'New';
  }

  IsRenewalSubscriptions(){
    this.SubscriptionsList = this.RenewalSubscriptionsList;
    this.IsSubName = 'Renewal';
  }

  IsSubName: any;
  public SalesChart: any;
  ClusterId: any;
  FDate: any;
  TDate: any;
  private getData(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`dashboard/?from=` + this.from + `&to=` + this.to + `&restaurant=` + this.RestaurantId + `&cluster=` + this.ClusterId, null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        this.loading = false;
        const responseData = res;
        this.alldata = responseData.data;
        this.NewSubscriptionsList = responseData.data.new_sub_customer_list;
        this.RenewalSubscriptionsList = responseData.data.renewal_customer_list;
        this.BreakFastData = responseData.data.sales.breakfast;
        this.SnacksData = responseData.data.sales.snacks;
        this.LunchData = responseData.data.sales.lunch;
        this.DinnerData = responseData.data.sales.dinner;
        this.LateNightData = responseData.data.sales.late_night;
        // this.SalesChart = responseData.data.sales.all_sales;
        let RestaurantCuisineChart = responseData.data.order_status;
        this.RestaurantCuisineChart = [];
        RestaurantCuisineChart.forEach((element: any) => {
          this.RestaurantCuisineChart.push({
                  'name': element.name ,
                  "y": Number(element.count),  
                  // sliced: true,  
                  // selected: true
                })
        });

        let RestaurantChart = responseData.data.cuisine_count;
        this.RestaurantChart = [];
        RestaurantChart.forEach((element: any) => {
          this.RestaurantChart.push({
                  'name': element.name ,
                  "y": Number(element.count),  
                  // sliced: true,  
                  // selected: true
                })
        });

        let ChartOrderAmount = responseData.data.sales.sales_vs_type;;
        this.ChartOrderAmount = [];
        ChartOrderAmount.forEach((element: any) => {
          this.ChartOrderAmount.push({
                  'name': element.name ,
                  "y": Number(element.amount),  
                  // sliced: true,  
                  // selected: true
                })
        });

        let ChartOrderCount = responseData.data.sales.sales_vs_type;;
        this.ChartOrderCount = [];
        ChartOrderCount.forEach((element: any) => {
          this.ChartOrderCount.push({
                  'name': element.name ,
                  "y": Number(element.count),  
                })
        });

        let SalesChart = responseData.data.sales.sales_vs_time;
        this.SalesChart = [];
        SalesChart.forEach((element: any) => {
          this.FDate = this.dtPipe.transform( element.from, 'dd-MM-yyyy')
          this.TDate = this.dtPipe.transform( element.to, 'dd-MM-yyyy')
          this.SalesChart.push({
                  'name': this.FDate  + '<br>' + this.TDate,
                  // 'name': element.from,
                  "y": Number(element.amount),  
                  sliced: true,  
                  selected: true
                })
        });
        
        this.loading = false;
      }
    });
  }

  Today() {
    this.FilterDate = 'Today';
    this.IsRange = false;
    let fromDate = new Date();
    this.from = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getData(1);
    // this.GetExportDashboard(1);
    this.loading = true;
  }
  days7() {
    this.FilterDate = 'days7';
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setDate(from.getDate() - 6);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getData(1);
    // this.GetExportDashboard(1);
    this.loading = true;
  }
  days15() {
    this.FilterDate = 'days15';
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setDate(from.getDate() - 14);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getData(1);
    // this.GetExportDashboard(1);
    this.loading = true;
  }
  days30() {
    this.FilterDate = 'days30';
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setMonth(from.getMonth() - 1);
    from.setDate(from.getDate() + 1);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate());
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getData(1);
    // this.GetExportDashboard(1);
  }

  month6() {
    this.FilterDate = 'month6';
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setMonth(from.getMonth() - 6);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getData(1);
    // this.GetExportDashboard(1);
  }
  year() {
    this.FilterDate = 'year';
    this.IsRange = false;
    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setFullYear(from.getFullYear() - 1);
    this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate() + 1);
    this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');
    this.getData(1);
    // this.GetExportDashboard(1);
  }

  DateRange(){
    this.IsRange = true;
  }

  
  private GetExportDashboard(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`dashboard/?export=true&from=` + this.ExportFrom + `&to=` + this.ExportTo + `&restaurant=` + this.RestaurantIdExport, null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.ExportData = responseData.data;
        this.loading = false;
        this.IsExport = true;
      }else {
        this.toastr.warning('Something went wrong !!')
        this.loading = false;
      }

    });
  }

  ExportFrom: any;
  ExportTo: any;
  ExportIsRangeDate(event: any) {
    let dateRange = event.value;
    this.ExportFrom = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.ExportTo = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.GetExportDashboard(1);
  }

  IsRestChangeExport(event: any) {
    let restaurant = event.target.value
    this.RestaurantIdExport = restaurant;
    this.GetExportDashboard(1);
  }

  IsExport = false;
  ExportDaysFilter(event: any) {
    if (event.target.value === 'undefined') {
      let fromDate = new Date();
      this.ExportFrom = this.dtPipe.transform(new Date(), 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.GetExportDashboard(1);
    } else if (event.target.value === '7') {
      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setDate(from.getDate() - 6);
      this.ExportFrom = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.GetExportDashboard(1);
    } else if (event.target.value === '15') {
      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setDate(from.getDate() - 14);
      this.ExportFrom = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.GetExportDashboard(1);
    } else if (event.target.value === '30') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setMonth(from.getMonth() - 1);
      this.ExportFrom = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.GetExportDashboard(1);
    }
    else if (event.target.value === '6') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setMonth(from.getMonth() - 6);
      this.ExportFrom = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.GetExportDashboard(1);
    }
    else if (event.target.value === '1') {

      let fromDate = new Date();
      let from = new Date(fromDate);
      from.setFullYear(from.getFullYear() - 1);
      this.ExportFrom = this.dtPipe.transform(from, 'yyyy-MM-dd');

      let to = new Date(fromDate);
      to.setDate(to.getDate() + 1);
      this.ExportTo = this.dtPipe.transform(to, 'yyyy-MM-dd');
      this.GetExportDashboard(1);
    }
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const ws1: xlsx.WorkSheet = xlsx.utils.table_to_sheet(this.epltable1.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new(); 
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.utils.book_append_sheet(wb, ws1, 'Sheet2');
    xlsx.writeFile(wb, 'Restaurants.xlsx' + new Date().getTime() + Excel_Extension);
   }
  
}