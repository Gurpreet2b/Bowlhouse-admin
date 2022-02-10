import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {
  public loading = false;
  UserName: any;
  RestaurantsList: any = [];
  PositionList: any = [];
  @Output() valueChange = new EventEmitter();

  form = new FormGroup({
    position: new FormControl('', [Validators.required]),
    paid_amount: new FormControl('', [Validators.required]),
    restaurant: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
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
    this.getRestaurants();
    // this.getPosition();
  }

  private getRestaurants() {
    this.http.get(`restaurant/restaurant_list`).subscribe((res: any) => {
      const responseData = res;
      this.RestaurantsList = responseData.data.restaurant;
    })
  }

  // private getPosition() {
  //   this.http.get(`featured_restaurant_empty_position_list`).subscribe((res: any) => {
  //     const responseData = res;
  //     this.PositionList = responseData.empty_positions;
  //   })
  // }

  onSubmit() {
    this.loading = true;
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const dataToSubmit = { ...this.form.value };
    const formData = new FormData();

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.http.post('featured_restaurant/', formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success("Position Added Successfully !!");
        this.valueChange.emit('position');
        this.onDismiss();
      } else {
        this.toastr.warning(res.error);
      }
    });
  }

  onDismiss() {
    const target = "#CreatefeaturedRestaurants";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
