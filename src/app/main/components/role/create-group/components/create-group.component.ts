import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  public loading = false;
  UserName: any;
  RestaurantsList: any = [];
  PositionList: any = [];
  @Output() valueChange = new EventEmitter();

  form = new FormGroup({
    group_name: new FormControl('', [Validators.required]),
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

    this.http.post('groups/', formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success("Group Added Successfully !!");
        this.valueChange.emit('group');
        this.form.reset();
        this.onDismiss();
      } else {
        this.toastr.warning(res.error);
      }
    });
  }

  onDismiss() {
    const target = "#CreateGroup";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
