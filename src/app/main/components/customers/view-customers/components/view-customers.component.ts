import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';
const Excel_Extension ='.xlsx';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  @ViewChild('epltable', { static: false })
  epltable!: ElementRef;
  public loading = false;
  customers: any = [];
  customerExport: any = [];
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  SubscribedFilter: any;
  form = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private http: HttpService,
    private toastr: ToastrService, private authService: AuthService,
    private activeRoute: ActivatedRoute,) { }
    
  ngOnInit(): void {
    this.customer_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName(`Customers`); 
    this.getcustomers(1);
    this.getcustomersExport(1);
  }

  IsFilterChange(event: any){
    this.SubscribedFilter = event.target.value;
    this.getcustomers(1);
  }

  PageJump: any = 10;
  PageTotalNumber: any = [];
  private getcustomers(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`customer/?search=${search}&filter=${this.SubscribedFilter}`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.customers = responseData.data.customer;
      this.totalItems = responseData.data.count;
      this.loading = false;
      this.PageTotalNumber = [];
      let Count = responseData.data.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumber.push(i);
      }

      if(this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      } 
    });
  }

  private getcustomersExport(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`customer/?export=true` + `&search=${search}`, null, { params: params }).subscribe((res: any) => {

      const responseData = res;
      this.customerExport = responseData.data.customer;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if(this.customerExport.length === 0) {
        this.toastr.warning("No Record Found");
      } 
    });
  }

  getCustomerById(page: number) {
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`customer/${this.customer_id}`, null, { params: params }).subscribe((res: any) => {
      console.log(res)
      const responseData = res;
      this.customers = responseData.data;

    });
  }


  onPageChange(event: any, data: any) {
    if(data === '1'){
      this.currentPage = event;
      this.getcustomers(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getcustomers(this.currentPage)
    }
    
  }
  onSubmit(formValue: any) {
    this.getcustomers(1);
  }

  onDeleteRestaurant(id: number) {
    this.http.delete(`customers/${id}`).subscribe((res: any) => {
      this.getcustomers(this.currentPage)
    });
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'customers.xlsx' + new Date().getTime() + Excel_Extension);
   }

}
