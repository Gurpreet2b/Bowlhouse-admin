import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import * as xlsx from 'xlsx';
const Excel_Extension ='.xlsx';

@Component({
  selector: 'app-view-restaurants',
  templateUrl: './view-restaurants.component.html',
  styleUrls: ['./view-restaurants.component.css']
})
export class ViewRestaurantsComponent implements OnInit {
  @ViewChild('epltable', { static: false })
  epltable!: ElementRef;
  public loading = false;
  restaurant_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  restaurants: any = [];
  restaurantExport: any = [];
  PageJump: any = 10;
  PageTotalNumber: any = [];
  ClusterList: any = [];
  ClusterId: any;
  
  public captureScreen() {
    var data = document.getElementById('htmlData') as any;
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;  
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
     
      var position = 1;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('File.pdf'); // Generated PDF   
    });
  }

  form = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private http: HttpService,
    private toastr: ToastrService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName(`Restaurants in BowlHouse Chain`); 
    this.getRestaurant(1);
    this.getRestaurantsExport(1);
    this.getCluster();
  }

  private getCluster() {
    this.http.get(`cluster/`).subscribe((res: any) => {
      const responseData = res;
      this.ClusterList = responseData.data.cluster;
    })
  }

  OnChangeCluster(event: any){
    this.ClusterId = event.target.value;
    this.getRestaurant(1);
  }

  private getRestaurants(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const filter = formValue.search || '';
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('restaurant/?size=20', null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.restaurants = responseData.data.restaurant;
      this.totalItems = responseData.data.count;
      this.loading = false;
      this.PageTotalNumber = [];
      let Count = responseData.data.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumber.push(i);
      }
      if(this.restaurants.length === 0) {
        this.toastr.warning("No Record Found");
      } 
    });
  }

  private getRestaurantsExport(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const filter = formValue.search || '';
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('restaurant/?export=true', null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.restaurantExport = responseData.data.restaurant;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if(this.restaurantExport.length === 0) {
        this.toastr.warning("No Record Found");
      } 
    });
  }

  onPageChange(event: any, data: any) {
    if(data === '1'){
      this.currentPage = event;
      this.getRestaurant(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getRestaurant(this.currentPage)
    }  
  }
  
  onSubmit(formValue: any) {
    this.getRestaurant(1);
  }

  SearchVal = 'id';
  OnChangeSearch(event: any){
    this.SearchVal = event.target.value;
    this.getRestaurant(1);
  }
  private getRestaurant(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`restaurant/?` + this.SearchVal + `=${search}` + `&cluster_id=${this.ClusterId}`, null, { params: params }).subscribe((res: any) => {

      console.log(res)
      const responseData = res;
      this.restaurants = responseData.data.restaurant;
      this.totalItems = responseData.data.count;
      this.loading = false;
      this.PageTotalNumber = [];
      let Count = responseData.data.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumber.push(i);
      }
      if(this.restaurants.length === 0) {
        this.toastr.warning("No Record Found");
      } 
      // else {
      //   this.toastr.success("Restaurant List");
      // }
    });
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.onDeleteRestaurant(id);
    }
  }
  onDeleteRestaurant(id: number) {
    this.http.delete(`restaurant/${id}/`).subscribe((res: any) => {
       this.getRestaurants(this.currentPage)
       this.toastr.warning("Deleted Successfully");
    });
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'restaurants.xlsx' + new Date().getTime() + Excel_Extension);
   }
}
