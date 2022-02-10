import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {

  restaurant_id: number | null = null;
  picture: File | undefined;
  category: any = [];
  cuisine: any = [];
  public loading = false;
  isActive: any = false;
  isAvailable: any = false;

  form = new FormGroup({
    picture: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    cuisine: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isVeg: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    discription: new FormControl('', [Validators.required]),
    discount: new FormControl(''),
    preparation_time: new FormControl('', [Validators.required]),
    action: new FormControl('add')
  });

  constructor(
    private http: HttpService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['restaurantId'] || 0;
    this.authService.SetRestaurantName('Add New Menu Item'); 
    this.getCategory()
    this.getCuisine()

  }

  private getCategory() {
    this.http.get(`category/`).subscribe((res: any) => {
      const responseData = res;
      this.category = responseData.data.category;
    })
  }
  private getCuisine() {
    this.http.get(`cuisine/?pagination=disabled`).subscribe((res: any) => {
      const responseData = res;
      this.cuisine = responseData.data.cuisine;
    })
  }


  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.picture = file;
  }



  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const dataToSubmit = {
      ...this.form.value, restaurant: this.restaurant_id,
      isActive: this.isActive, isAvailable: this.isAvailable
    };


    const formData = new FormData();
    if (this.picture) {
      formData.append('picture', this.picture);
    }

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post('foodmenu_approval/', formData)
      .subscribe(data => {
        const responseData: any = data;
        if (responseData.status === true) {
          this.toastr.success('Menu Added Successfully !!');
          this.loading = false;
          this.router.navigate(['/restaurant-approvals']);
        } else {
          this.toastr.error(responseData.error);
          this.loading = false;
        }
      },
        error => {
          this.loading = false;
        });
  }

}

