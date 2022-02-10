import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  loading = false;
  profile_pic: File | undefined;
  restaurant_id: number | null = null;
  row: any = [];
  rows: any = [];
  cuisines: any = [];
  ClusterList: any = [];
  ImgPath: any;
  form = new FormGroup({
    name: new FormControl('', []),
    contact_person: new FormControl('', []),
    address: new FormControl('', []),
    mobile: new FormControl('', []),
    email: new FormControl('', []),
    cuisine: new FormControl('', []),
    profile_pic: new FormControl(null, []),
    cluster: new FormControl(null, []),
    owner_name: new FormControl(null, []),
    action: new FormControl('edit'),
    restaurant_id: new FormControl(),
    rating: new FormControl(0),
    opening_time: new FormControl({ hour: 10, minute: 0 }, [Validators.required]),
    closing_time: new FormControl({ hour: 7, minute: 0 }, [Validators.required]),
  });
  cuisine: any;


  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private router: Router,private authService: AuthService,
    private toastr: ToastrService, private dtPipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName('Edit Restaurant'); 
    this.getCuisine();
    this.getCluster();
    this.getRestaurant();
  }


  private getCuisine() {
    this.http.get(`cuisine/?pagination=disabled`).subscribe((res: any) => {
      const responseData = res;
      this.cuisines = responseData.data.cuisine;
    })
  }

  private getCluster() {
    this.http.get(`cluster/`).subscribe((res: any) => {
      const responseData = res;
      this.ClusterList = responseData.data.cluster;
    })
  }

  private getRestaurant() {
    this.http.get(`restaurant/${this.restaurant_id}`).subscribe((res: any) => {
      this.row = res.data;
      this.ImgPath = res.data.profile_pic;
      let OHours = this.row.opening_time.substring(0,2);
      let OMinute = this.row.opening_time.substring(2,2);
      let CHours = this.row.closing_time.substring(0,2);
      let CMinute = this.row.closing_time.substring(2,2);
      // this.profile_pic = res.data.profile_pic;
      this.form.setValue({
        profile_pic: "",
        name: this.row.name,
        address: this.row.address,
        contact_person: this.row.contact_person,
        mobile: this.row.mobile,
        email: this.row.email,
        cuisine: this.row.cuisine,
        cluster: this.row.cluster,
        owner_name: this.row.owner_name,
        action: 'edit',
        restaurant_id: '',
        rating: this.row.rating,
        opening_time: { hour: Number(OHours), minute: Number(OMinute) },
        closing_time: { hour: Number(CHours), minute: Number(CMinute) },
      });
    })
    // this.profile_pic = this.ImgPath;

  }
  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.profile_pic = file;
    // this.ImgPath = file;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const dataToSubmit = { ...this.form.value };

    let openHour = dataToSubmit.opening_time.hour.toString();
    let openMinute = dataToSubmit.opening_time.minute.toString();
    let closeHour = dataToSubmit.closing_time.hour.toString();
    let closeMinute = dataToSubmit.closing_time.minute.toString();

    if (openHour.length === 1) {
      openHour = `0${openHour}`;
    }

    if (openMinute.length === 1) {
      openMinute = `0${openMinute}`;
    }

    if (closeHour.length === 1) {
      closeHour = `0${closeHour}`;
    }

    if (closeMinute.length === 1) {
      closeMinute = `0${closeMinute}`;
    }

    const openingTime = `${openHour}:${openMinute}`;
    const closingTime = `${closeHour}:${closeMinute}`;
    dataToSubmit.opening_time = openingTime;
    dataToSubmit.closing_time = closingTime;

    const formData = new FormData();
    if (this.profile_pic) {
      formData.append('profile_pic', this.profile_pic);
    } else {
      formData.append('profile_pic', '');
    }

    formData.append('restaurant_id', String(this.restaurant_id));

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });


    this.http.post(`restaurant_approval/`, formData).subscribe((res: any) => {
      const responseData = res.data;
      // this.toastr.success("Updated Successfully");
      // this.router.navigateByUrl('/restaurants');
      if (res.status === true) {
        this.toastr.success('Updated Successfully');
        this.loading = false;
        this.router.navigateByUrl(`/restaurant-approvals`);
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    },
      error => {
        this.loading = false;
      });
  }

}