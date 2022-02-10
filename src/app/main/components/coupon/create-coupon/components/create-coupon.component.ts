import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {
  currentPage: number = 1;
  picture: File | undefined;
  public loading = false;
  UserName: any;
  CustomerList: any = [];
  CustomerLists: any = [];
  RestaurantsList: any = [];
  @Output() valueChange = new EventEmitter();
  Search: any = '';
  ValueLimit: any;

  form = new FormGroup({
    coupon_code: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    // restaurant_list: new FormControl(''),
    start_from: new FormControl('', [Validators.required]),
    valid_upto: new FormControl('', [Validators.required]),
    // customer: new FormControl(''),
    limit: new FormControl(''),
    user_id: new FormControl(''),
    action: new FormControl('add'),
    coupon: new FormControl(''),
    active: new FormControl(''),
    order_min_value: new FormControl('', [Validators.required]),
    value_limit: new FormControl(''),
  });

  constructor(
    private http: HttpService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.UserName = this.authService.getUserName();
    this.getCustomers();
    this.getRestaurants();
  }

  private getRestaurants() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.RestaurantsList = responseData.data.restaurant;
    })
  }

  // onSearchKeyUp(event: any){
  //   this.Search = event.target.value;
  //   this.getCustomerSearch();
  // }
  private getCustomers() {
    this.http.get(`customer/?search=${this.Search}`).subscribe((res: any) => {
      this.CustomerList = res.data.customer;
    })
  }

  public getCustomerSearch() {
    this.http.get(`customer/find_by_id/?customer_id=${this.Search}`).subscribe((res: any) => {
      this.CustomerLists = res.data;
    })
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    if(file.size > '1048576'){
      this.toastr.warning("File size cannot be larger than 1MB!");
      return;
    } else{
      this.picture = file;
    }
  }
  onDismiss() {
    const target = "#CreateCouponModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

  IsSelectType(event: any){
    this.IsType = event.target.value;
  }

  IsType: any;
  onSubmit() {
    if (this.picture === null || this.picture === undefined) {
      this.toastr.warning("Please Select Your Coupon Pic");
      return;
    }
    if(this.form.value.type === 'percent') {
      if (this.form.value.value > 60) {
        this.toastr.warning("Coupon percent value should be less than 60");
        return
      }
    } else if (this.form.value.type === 'value') {
      if (this.form.value.order_min_value < this.form.value.value * 2) {
        this.toastr.warning("Order Minimum Value should be atleast double than the coupon value");
        return
      }
    }

    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const dataToSubmit = { ...this.form.value };


    const formData = new FormData();
    if (this.picture) {
      formData.append('image', this.picture);
    }
    formData.append('customer_list', this.CustomerSelectId);
    formData.append('restaurant_list', this.RestaurantSelectId);
    // formData.append('value_limit', this.ValueLimit);

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post('coupons_approval/', formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success("Coupon Added Successfully !!");
        this.valueChange.emit('coupon');
        this.onDismiss();
      } else {
        this.toastr.warning(res.error);
      }
      // window.location.reload();
      //  this.router.navigateByUrl('/cuisines');
    });
  }

  onCustomerDismiss() {
    const target = "#CustomerListModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }
  IsOpenCustomer() {
    this.Search = '';
    this.CustomerLists = [];
    this.IsCheck = false;
    this.SelectedCustomer = ''
    $('.modal-backdrop').remove();
  }

  CustomerItem: any;
  IsCheck: any;
  SelectedCustomer: any;
  CustomerSelectList: any = [];
  CustomerSelectId: any = [];
  IsCustomer(event: any, item: any) {
    this.SelectedCustomer = event.target.checked;
    this.CustomerItem = item;
  }

  onSubmitCustomer() {
    if (this.SelectedCustomer === true) {
      let custom = this.CustomerSelectList.filter((x: any) => x.id === this.CustomerLists[0].id);
      if(custom.length === 0){
        this.CustomerSelectList.push(this.CustomerItem);
        this.CustomerSelectId.push(this.CustomerItem.id);
        this.onCustomerDismiss();
      }else {
        this.SelectedCustomer = false;
        this.IsCheck = false;
        this.toastr.warning("This record is duplicate entry.please correct entry");
      }
     
    } else {
      this.toastr.warning("Please Select Customers.");
    }
  }

  DeleteCustomer(index: any){
    this.CustomerSelectList.splice(index, 1);
    this.CustomerSelectId.splice(index, 1);
  }

  RestaurantSelectList: any = [];
  SelectedRestaurant: any;
  RestaurantItem: any;
  RestaurantSelectId: any = [];

  onSubmitRestaurant() {
    let custom = this.RestaurantsList.filter((x: any) => x.is_restaurant_checked === true);
    if(custom.length > 0){
      this.RestaurantSelectList = custom;
      this.onRestaurantDismiss();
      for (let i = 0; i < this.RestaurantSelectList.length; i++) {
        const element = this.RestaurantSelectList[i].id;
        this.RestaurantSelectId.push(element);
      }
    } else {
      this.toastr.warning("Please Select Restaurants.");
    }
  }

  DeleteRestaurant(index: any){
    this.RestaurantSelectList.splice(index, 1);
    this.RestaurantSelectId.splice(index, 1);
  }

  IsOpenRestaurant() {
    this.SelectedRestaurant = ''
    $('.modal-backdrop').remove();
  }


  onRestaurantDismiss() {
    const target = "#RestaurantListModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
