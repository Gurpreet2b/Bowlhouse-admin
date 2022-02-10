import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-header-content',
  templateUrl: './edit-header-content.component.html',
  styleUrls: ['./edit-header-content.component.css']
})
export class EditHeaderContentsComponent implements OnInit {
  picture: File | undefined;
  row: any = [];
  public loading = false;
  UserName: any;
  @Input() headerId: any;
  @Output() valueChange = new EventEmitter();
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
  });

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private http: HttpService,
    private toastr: ToastrService, private dtPipe: DatePipe,
    private router: Router,private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.UserName = this.authService.getUserName();
    this.getOffers()
  }

  ImgPath: any;
  private getOffers() {
    this.loading = true;
    this.http.get(`customer_app_title/${this.headerId}`).subscribe((res: any) => {
      this.row = res.data.coupons_category;
      this.ImgPath = res.data.picture;
      this.form.patchValue(res.data);
      this.valueChange.emit('headerContent');
    })
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

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });

    this.loading = true;
    this.http.put(`customer_app_title/${this.headerId}/`, formData).subscribe((res: any) => {
      const responseData = res.data;
      this.loading = false;
      if(res.status === true){
        this.toastr.success("Updated Successfully");
        this.valueChange.emit('headerContent');
        this.onDismiss();
      } else {
        this.toastr.warning("Something went wrong !!");
      }
      
    });
  }

  onDismiss() {
    this.modalService.dismissAll();
  }

}
