import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from '../../create-user/components/confirmed.validator';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public loading = false;
  UserName: any;
  GroupList: any = [];
  UserDetails: any;
  UserId: any;
  JoinDate: any;
  Changeform: FormGroup;
  Permissions: any = [];

  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,private dtPipe: DatePipe,
    private authService: AuthService, private activeRoute: ActivatedRoute,
  ) { 
    this.Changeform = fb.group({
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit(): void {
    this.UserName = this.authService.getUserName();
    this.UserId = this.activeRoute.snapshot.params['id'] || 0;
    this.getGroup();
    this.getUsers();
  }

  private getUsers() {
    this.loading = true;
    this.http.get(`users/${this.UserId}`, null,).subscribe((res: any) => {
      const responseData = res;
      this.UserDetails = responseData.data;
      this.Permissions = responseData.data.groups[0].tab_permissions;
      this.JoinDate = this.dtPipe.transform(this.UserDetails.date_joined, 'yyyy-MM-dd');
      this.loading = false;

    });
  }

  private getGroup() {
    this.http.get(`groups`).subscribe((res: any) => {
      const responseData = res;
      this.GroupList = responseData.data;
    })
  }

  onSubmit() {
    this.loading = true;
    this.Changeform.markAllAsTouched();
    if (!this.Changeform.valid) {
      return;
    }
    const dataToSubmit = { ...this.Changeform.value };
    const formData = new FormData();

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.http.post('users/', formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success("User Password Generated Successfully !!");
        this.Changeform.reset();
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
