import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOffersComponent implements OnInit {
  picture: File | undefined;
  DynamicHTML: File | undefined;
  row: any = [];
  public loading = false;
  UserName: any;
  @Input() couponId: any;
  @Output() valueChange = new EventEmitter();
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lower_limit: new FormControl('', [Validators.required]),
    upper_limit: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    start_from: new FormControl('', [Validators.required]),
    valid_upto: new FormControl('', [Validators.required]),
    action: new FormControl('edit'),
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
    this.getOffers()
  }

  ImgPath: any;
  private getOffers() {
    this.loading = true;
    this.http.get(`coupons_category/${this.couponId}`).subscribe((res: any) => {
      this.row = res.data.coupons_category;
      this.ImgPath = res.data.picture;
      this.form.patchValue(res.data);
      this.valueChange.emit('Cuisine_id');
      this.form.setValue({
        name: res.data.name,
        type: res.data.type,
        lower_limit: res.data.lower_limit,
        upper_limit: res.data.upper_limit,
        start_from: this.dtPipe.transform(res.data.start_from, 'yyyy-MM-dd'),
        valid_upto: this.dtPipe.transform(res.data.valid_upto, 'yyyy-MM-dd'),
        action: 'edit',
      });

    })
  }

  onSelectFileDynamic(event: any) {
    const HTMLfile = event.target.files[0];
    this.DynamicHTML = HTMLfile;
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.picture = file;
    this.ImgPath = file;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formData = new FormData();
    if (this.picture) {
      formData.append('image', this.picture);
    } else {
      formData.append('image', '');
    }
    if (this.DynamicHTML) {
      formData.append('html', this.DynamicHTML);
    }else {
      formData.append('html', '');
    }
    formData.append('coupons_category_id', this.couponId);

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });

    this.loading = true;
    this.http.post(`coupons_category_approval/`, formData).subscribe((res: any) => {
      const responseData = res.data;
      this.loading = false;
      if(res.status === true){
        this.toastr.success("Updated Successfully");
        // this.router.navigateByUrl('/cuisines');
        this.onDismiss();
      } else {
        this.toastr.warning("Something went wrong !!");
      }
      
    });
  }

  private popultateForm(data: any) {

  }

  onDismiss() {
    this.modalService.dismissAll();
  }

}
