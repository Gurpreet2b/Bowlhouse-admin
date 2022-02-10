import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  // @ViewChild('isActive') isActive: any;
  foodPic: File | undefined;
  foodmenu_id: number | null = null;
  category: any = [];
  cuisines: any = [];
  row: any = [];
  rows: any = [];
  isActive: any
  isAvailable: any = false;
  restaurantId: any = false;
  public loading = false;

  form = new FormGroup({
    // picture: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    cuisine: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isVeg: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    discription: new FormControl('', [Validators.required]),
    discount: new FormControl(null),
    preparation_time: new FormControl(null, [Validators.required]),
    action: new FormControl('edit')
  });
  food: any;
  // IsActive: any;
  // IsAvailable: any;

  constructor(private http: HttpService,
    private activeRoute: ActivatedRoute,
    private router: Router, private auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.foodmenu_id = this.activeRoute.snapshot.params['menuItemId'] || 0;
    this.auth.SetRestaurantName(`Edit menu item`); 
    this.getMenu();

    this.getCategory()
    this.getCuisine()
  }

  private getCategory() {
    this.http.get(`category/`).subscribe((res: any) => {
      const responseData = res;
      this.category = responseData.data.category;
      console.log(this.category)
    })
  }
  private getCuisine() {
    this.http.get(`cuisine/?pagination=disabled`).subscribe((res: any) => {
      const responseData = res;
      this.cuisines = responseData.data.cuisine;
      console.log(this.cuisines)
    })
  }

  ImgPath: any;
  private getMenu() {
    this.http.get(`foodmenu/${this.foodmenu_id}`).subscribe((res: any) => {
      this.form.patchValue(res.data);
      this.restaurantId = res.data.restaurant.id;
      this.ImgPath = res.data.picture;
      // this.rows = res.data.category;
      this.isActive = res.data.isActive;
      this.isAvailable = res.data.isAvailable;
      this.form.setValue({
        cuisine: res.data.cuisine.id,
        category: res.data.category.id,
        name: res.data.name,
        isVeg: res.data.isVeg,
        // isActive: res.data.id,
        // isAvailable: res.data.id,
        price: res.data.price,
        discription: res.data.discription,
        discount: res.data.discount,
        preparation_time: res.data.preparation_time,
        action: 'edit'
      });
      console.log(res.data)
    })
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.foodPic = file;
  }

  onSubmit() {

    if (!this.form.valid) {
      return;
    }

    const formData = new FormData();
    if (this.foodPic) {
      formData.append('picture', this.foodPic);
    }else {
      formData.append('picture', '');
    }
    formData.append('id', String(this.foodmenu_id));
    formData.append('restaurant', String(this.restaurantId));
    formData.append('isActive', this.isActive);
    formData.append('isAvailable', this.isAvailable);

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });
    this.loading = true;
    this.http.post(`foodmenu_approval/`, formData).subscribe((res: any) => {
      if(res.status === true) {
        this.loading = false;
        this.toastr.success("Updated Successfully");
        this.router.navigateByUrl(`/restaurant-approvals`);
      } else {
        this.loading = false;
        this.toastr.warning("Something went wrong !!");
      }
      this.loading = false;
    });
  }
}
