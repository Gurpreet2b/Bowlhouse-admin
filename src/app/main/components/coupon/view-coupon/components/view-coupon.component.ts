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
  selector: 'app-view-coupon',
  templateUrl: './view-coupon.component.html',
  styleUrls: ['./view-coupon.component.css'],
})

export class ViewCouponComponent implements OnInit {
  currentPage: number = 1;
  Coupons: any = [];
  totalItems: number | undefined;
  cuisine_id: number | null = null;
  id: number | null = null;
  row: any = [];
  public loading = false;
  // @ViewChild(EditCuisineComponent) child:any;
  

  form = new FormGroup({
    picture: new FormControl(null),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private modalService: NgbModal,
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router,private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  // ngAfterViewInit() {
  //   // child is set
  //   this.child?.doSomething();
  //   console.log(this.child?.doSomething())
  //   console.log(this.child);
  // }

  ngOnInit(): void {
    this.cuisine_id = this.activeRoute.snapshot.params['id'];
    this.authService.SetRestaurantName(); 
    console.log(this.cuisine_id)
    this.getCuisines(1);
  }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getCuisines(event)
  }

  private getCuisines(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('coupons/', null, { params: params }).subscribe((res: any) => {
      if(res.status === true){
        const responseData = res;
        this.Coupons = responseData.data.coupons;
        this.totalItems = responseData.data.count;
        this.loading = false;
        if(this.Coupons.length === 0) {
          this.toastr.warning("No Record Found");
        }
        //  else {
       //   this.toastr.success("Cuisines List");
        // }
        console.log(res.data)
      } 
      
    });
  }

  // CustomerName: any;
  // CustomerEmail: any;
  // CustomerMobile: any;
  // CustomerGender: any;
  // CustomerDate: any;
  // CustomerNationality: any;
  // IsVerified: any;
  // IsSubscribed: any;
  ViewCustomerList: any = [];
  ViewRestaurntsList: any = [];
  IsViewList(coupon: any){
    this.ViewCustomerList = coupon.customer_list;
    this.ViewRestaurntsList = coupon.restaurant_list;
  }

  ValueChanged(coupon: any) {
    if (coupon === 'coupon') {
      this.getCuisines(1);
    }
  }
  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.onDeleteCuisine(id);
    }
  }
  onDeleteCuisine(id: number) {
    this.http.delete(`cuisine/${id}/`).subscribe((res: any) => {
      this.toastr.warning("Deleted Successfully");
      this.getCuisines(this.currentPage)
    });
  }
  onCreateCuisine() {
    // const modalRef = this.modalService.open(CreateCuisineComponent);
  }

  onEditCuisine(id: any) {
    const modalRef = this.modalService.open(EditCouponComponent);
    modalRef.componentInstance.couponId = id;
        
  }
}

