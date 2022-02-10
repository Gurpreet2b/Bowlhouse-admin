import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOffersComponent implements OnInit {
  currentPage: number = 1;
  picture: File | undefined;
  DynamicHTML: File | undefined;
  public loading = false;
  UserName: any;
  @Output() valueChange = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lower_limit: new FormControl('', [Validators.required]),
    upper_limit: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    start_from: new FormControl('', [Validators.required]),
    valid_upto: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    action: new FormControl('add'),
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
  }

  onSelectFileDynamic(event: any) {
    const HTMLfile = event.target.files[0];
    if(HTMLfile.size > '1048576'){
      this.toastr.warning("File size cannot be larger than 1MB!");
      return;
    } else{
      this.DynamicHTML = HTMLfile;
    }
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
    const target = "#CreateOfferModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }
  onSubmit() {
    if (this.picture === null || this.picture === undefined) {
      this.toastr.warning("Please Select Your Offer Flash Card Pic");
      return;
    }
    this.form.markAllAsTouched();
      if (!this.form.valid) {
        return;
      }
      const dataToSubmit = { ...this.form.value};

      const formData = new FormData();
      if (this.picture) {
        formData.append('image', this.picture);
      }
      if (this.DynamicHTML) {
        formData.append('html', this.DynamicHTML);
      }

      Object.keys(dataToSubmit).forEach(key => {
        if (!formData.has(key)) {
          formData.append(key, dataToSubmit[key])
        }
      });

      this.loading = true;
      this.http.post('coupons_category_approval/', formData).subscribe((res: any) => {
        this.loading = false;
        if(res.status === true){
          this.toastr.success("Offer Added Successfully !!");
          this.valueChange.emit('offer');
          this.onDismiss();
        } else {
          this.toastr.warning("Something went wrong !!");
        }
      });
  }

}
