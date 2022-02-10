import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// import { $ } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-cluster',
  templateUrl: './create-cluster.component.html',
  styleUrls: ['./create-cluster.component.css']
})
export class CreateClusterComponent implements OnInit {
  currentPage: number = 1;
  picture: File | undefined;
  public loading = false;
  @Output() valueChange = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    latitude: new FormControl('', []),
    longitude: new FormControl('', []),
    picture: new FormControl('', [Validators.required]),
    action: new FormControl('add'),
  });

  constructor(
    private http: HttpService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.picture = file;
  }
  onDismiss() {
    const target = "#CreateClusterModal";
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
    if (this.picture) {
      formData.append('image', this.picture);
    }

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post('cluster_approval/', formData).subscribe((res: any) => {
      if(res.status === true) {
        const responseData = res.data;
        this.toastr.success("Cluster Added Successfully !!");
        // window.location.reload();
        this.valueChange.emit('cluster');
        this.loading = false;
        this.onDismiss();
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
  }

}
