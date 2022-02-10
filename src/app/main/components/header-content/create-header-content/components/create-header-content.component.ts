import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-header-content',
  templateUrl: './create-header-content.component.html',
  styleUrls: ['./create-header-content.component.css']
})
export class CreateHeaderContentComponent implements OnInit {
  currentPage: number = 1;
  // picture: File | undefined;
  public loading = false;
  UserName: any;
  @Output() valueChange = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
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

  // onSelectFile(event: any) {
  //   const file = event.target.files[0];
  //   this.picture = file;
  // }
  onDismiss() {
    const target = "#CreateHeaderModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }
  onSubmit() {
  this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const dataToSubmit = { ...this.form.value};

    const formData = new FormData();

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post('customer_app_title/', formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.toastr.success("Header Content Added Successfully !!");
        this.valueChange.emit('headerContent');
        this.onDismiss();
      } else {
        this.toastr.warning("Something went wrong !!");
      }
      // window.location.reload();
      //  this.router.navigateByUrl('/cuisines');
    });
  }

}
