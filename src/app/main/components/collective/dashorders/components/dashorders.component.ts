import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashorders',
  templateUrl: './dashorders.component.html',
  styleUrls: ['./dashorders.component.css']
})
export class DashordersComponent implements OnInit {
  public loading = false;
  customers: any = [];
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  form = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,) { }
    
  ngOnInit(): void {
    this.customer_id = this.activeRoute.snapshot.params['id'] || 0;
     this.getcustomers(1);
  }


  private getcustomers(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`customer/?search=${search}`, null, { params: params }).subscribe((res: any) => {

      const responseData = res;
      this.customers = responseData.data.customer;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if(this.customers.length === 0) {
        this.toastr.warning("No Record Found");
      } 
      // else {
      //   this.toastr.success("Customer List");
      // }
      console.log(res.data)
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


  onPageChange(event: number) {
    this.currentPage = event;
    this.getcustomers(event)
  }
  onSubmit(formValue: any) {
    this.getcustomers(1);
  }

  onDeleteRestaurant(id: number) {
    this.http.delete(`customers/${id}`).subscribe((res: any) => {
      this.getcustomers(this.currentPage)
    });
  }

}


