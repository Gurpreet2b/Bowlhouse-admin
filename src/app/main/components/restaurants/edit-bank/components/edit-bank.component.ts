import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.component.html',
  styleUrls: ['./edit-bank.component.css']
})
export class EditBankComponent implements OnInit {

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
    bank_address: new FormControl('', [Validators.required]),
    ifsc_code: new FormControl('', [Validators.required]),
    account_number: new FormControl('', [Validators.required]),
  });
  name: any;

  constructor(
    private http: HttpService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
      this.getCategory();
  }


  private getCategory() {
    this.http.get(`restaurant/${this.restaurant_id}/bank_details/`).subscribe((res: any) => {
      this.form.patchValue(res.data);
      this.name = res.data;
      console.log(res)
    })
  }


  onSubmit() {

    if (!this.form.valid) {
      return;
    }

    const formData = new FormData();

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });


    this.http.patch(`restaurant/${this.restaurant_id}/bank_details/`, formData).subscribe((res: any) => {
      const responseData = res.data;
      this.toastr.success("Updated Successfully");
      this.router.navigate(['/restaurants/restdetail/', this.restaurant_id]);
    });
  }



}
