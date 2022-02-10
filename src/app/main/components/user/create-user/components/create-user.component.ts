import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public loading = false;
  UserName: any;
  GroupList: any = [];
  PositionList: any = [];
  @Output() valueChange = new EventEmitter();
  form: FormGroup = new FormGroup({});

  constructor(
    private http: HttpService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthService, private fb: FormBuilder
  ) { 
    this.form = fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      group_id: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit(): void {
    this.UserName = this.authService.getUserName();
    this.getGroup();
    // this.getPosition();
  }

  private getGroup() {
    this.http.get(`groups`).subscribe((res: any) => {
      const responseData = res;
      this.GroupList = responseData.data;
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

    this.http.post('users/', formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success("User Created Successfully !!");
        this.valueChange.emit('user');
        this.form.reset();
        this.onDismiss();
      } else {
        this.toastr.warning(res.error);
      }
    });
  }

  onDismiss() {
    const target = "#CreateUser";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
