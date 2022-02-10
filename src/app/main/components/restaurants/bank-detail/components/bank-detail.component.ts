import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {

  restaurant_id: number | null = null;
  picture: File | undefined;
  category: any = [];
  cuisine: any = [];
  public loading = false;
  isActive: any
  isAvailable: any

  form = new FormGroup({
    bank_name: new FormControl('', [Validators.required]),
    account_holder_name: new FormControl('', [Validators.required]),
    bank_address: new FormControl('',[Validators.required]),
    ifsc_code: new FormControl('', [Validators.required]),
    account_number: new FormControl('', [Validators.required]),
  });

  constructor(
    private http: HttpService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['restaurantId'] || 0;

  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }
    const dataToSubmit = { ...this.form.value, restaurant: this.restaurant_id };

    console.log(dataToSubmit)
    const formData = new FormData();

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post(`restaurant/${this.restaurant_id}/bank_details/`, formData)
      .subscribe(data => {
        const responseData: any = data;
        if (responseData.status === true) {
          this.toastr.success('Details Added');
          this.loading = false;
          this.router.navigate(['/restaurants/restdetail/', this.restaurant_id]);
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


