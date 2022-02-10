import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {
  public loading = false;
  profile_pic: File | undefined;
  cuisine: any = [];
  ClusterList: any = [];
  time = { hour: 13, minute: 30, second: 30 };
  seconds = true;
  meridian = true;
  opening_time: any;

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contact_person: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    opening_time: new FormControl({ hour: 10, minute: 0 }, [Validators.required]),
    closing_time: new FormControl({ hour: 19, minute: 0 }, [Validators.required]),
    cuisine: new FormControl('', [Validators.required]),
    owner_name: new FormControl('', [Validators.required]),
    cluster: new FormControl('', [Validators.required]),
    profile_pic: new FormControl(null, [Validators.required]),
    rating: new FormControl(0),
    action: new FormControl('add')
  });

  constructor(private http: HttpService,
    private toastr: ToastrService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.SetRestaurantName('Register New Restaurant'); 
    this.getCuisine();
    this.getCluster();
  }
  

  private getCuisine() {
    this.http.get(`cuisine/?pagination=disabled`).subscribe((res: any) => {
      const responseData = res;
      this.cuisine = responseData.data.cuisine;
    })
  }

  private getCluster() {
    this.http.get(`cluster/`).subscribe((res: any) => {
      const responseData = res;
      this.ClusterList = responseData.data.cluster;
    })
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.profile_pic = file;
  }

  onSubmit() {
     this.form.markAllAsTouched();

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

    console.log(dataToSubmit);

    const formData = new FormData();
    if (this.profile_pic) {
      formData.append('profile_pic', this.profile_pic);
    }
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });
    this.loading = true;
      this.http.post('restaurant_approval/', formData)
        .subscribe(data => {
          const responseData: any = data;
          if (responseData.status === true) {
            this.toastr.success('Restaurant Added');
            this.loading = false;
            this.router.navigateByUrl(`/restaurants`);
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


