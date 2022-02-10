import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public loading = false;
  UserName: any;
  GroupList: any = [];
  PositionList: any = [];
  @Output() valueChange = new EventEmitter();
  @Input() UserId: any;
  form: FormGroup = new FormGroup({});

  constructor(
    private http: HttpService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthService, private fb: FormBuilder
  ) { 
    this.form = fb.group({
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit(): void {
    this.UserName = this.authService.getUserName();
  }

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

    this.http.post(`users/${this.UserId}/reset_password/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success("User Password Reset Successfully !!");
        this.form.reset();
        this.onDismiss();
      } else {
        this.toastr.warning(res.error);
      }
    });
  }

  onDismiss() {
    const target = "#ChangePasswordModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
