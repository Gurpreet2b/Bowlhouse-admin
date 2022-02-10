import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css']
})
export class EditCouponComponent implements OnInit {
  picture: File | undefined;
  row: any = [];
  public loading = false;
  UserName: any;
  CustomerList: any = [];
  CustomerLists: any = [];
  RestaurantsList: any = [];
  @Input() couponId: any;
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
    action: new FormControl('edit'),
    active: new FormControl(''),
    order_min_value: new FormControl('', [Validators.required]),
    value_limit: new FormControl(''),
  });

  doSomething() {
    console.log('test');
  }

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private http: HttpService,
    private toastr: ToastrService, private dtPipe: DatePipe,
    private router: Router,private authService: AuthService
  ) { }

  ngOnInit(): void {
    // console.log(this.couponId);
    this.UserName = this.authService.getUserName();
    this.getCustomers();
    this.getCoupons();
    this.getRestaurants();
  }

  private getRestaurants() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.RestaurantsList = responseData.data.restaurant;
    })
  }

  onSearchKeyUp(event: any){
    this.Search = event.target.value;
    this.getCustomers();
  }

  private getCustomers() {
    this.loading = true;
    this.http.get(`customer/?search=${this.Search}`).subscribe((res: any) => {
      this.CustomerList = res.data.customer;
    })
  }

  public getCustomerSearch() {
    this.http.get(`customer/find_by_id/?customer_id=${this.Search}`).subscribe((res: any) => {
      this.CustomerLists = res.data;
    })
  }

  ImgPath: any;
  restID: any;
  private getCoupons() {
    this.loading = true;
    this.http.get(`coupons/${this.couponId}`).subscribe((res: any) => {
      this.row = res.data.cuisine;
      this.ImgPath = res.data.picture;
      this.CustomerSelectList = res.data.customer_list;
      for (let i = 0; i < this.CustomerSelectList.length; i++) {
        const element = this.CustomerSelectList[i].id;
        this.CustomerSelectId.push(element);
      }
      this.RestaurantSelectList = res.data.restaurant_list;
      for (let i = 0; i < this.RestaurantSelectList.length; i++) {
        const element = this.RestaurantSelectList[i].id;
        this.RestaurantSelectId.push(element);
      }

      if(res.data.restaurant === null) {
        this.restID = '';
      } else {
        this.restID = res.data.restaurant_list;
      }
      
      this.form.patchValue(res.data);
      this.valueChange.emit('Cuisine_id');
      this.form.setValue({
        coupon_code: res.data.coupon_code,
        title: res.data.title,
        description: res.data.description,
        type: res.data.type,
        value: res.data.value,
        start_from: this.dtPipe.transform(res.data.start_from, 'yyyy-MM-dd'),
        valid_upto: this.dtPipe.transform(res.data.valid_upto, 'yyyy-MM-dd'),
        limit: res.data.limit,
        active: res.data.active,
        // restaurant_list: this.restID,
        // customer: res.data.customer.id,
        action: 'edit',
        user_id: '',
        order_min_value: res.data.order_min_value,
        value_limit: res.data.value_limit
      });
      this.IsType = res.data.type;
    })
  }


  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.picture = file;
    this.ImgPath = file;
  }

  IsSelectType(event: any){
    this.IsType = event.target.value;
  }

  IsType: any;

  onSubmit() {
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

    if (!this.form.valid) {
      return;
    }

    const formData = new FormData();
    if (this.picture) {
      formData.append('image', this.picture);
    } else {
      formData.append('image', '');
    }
    formData.append('id', this.couponId);
    formData.append('coupon', this.couponId);
    formData.append('customer_list', this.CustomerSelectId);
    formData.append('restaurant_list', this.RestaurantSelectId);
    // formData.append('value_limit', this.ValueLimit);

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });

    this.loading = true;
    this.http.post(`coupons_approval/`, formData).subscribe((res: any) => {
      const responseData = res.data;
      this.loading = false;
      if(res.status === true){
        this.toastr.success("Updated Successfully");
        // this.router.navigateByUrl('/cuisines');
        this.onDismiss();
      } else {
        this.toastr.warning(res.error);
      }
      
    });
  }

  private popultateForm(data: any) {

  }

  onDismiss() {
    this.modalService.dismissAll();
    $('.modal-backdrop').remove();
  }

  onCustomerDismiss() {
    const target = "#CustomerListEditModal";
    $(target).hide();
    // $('.modal-backdrop').remove();
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
    const target = "#RestaurantListEditModal";
    $(target).hide();
    // $('.modal-backdrop').remove();
  }

}


