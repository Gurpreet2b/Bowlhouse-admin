import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// import { $ } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  currentPage: number = 1;
  picture: File | undefined;
  public loading = false;
  IsType: any;
  @Output() valueChange = new EventEmitter();

  form = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    order: new FormControl(''),
    subtype: new FormControl('', [Validators.required]),
    message: new FormControl(''),
  });

  constructor(
    private http: HttpService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  IsTypeChange(event: any){
    this.IsType = event.target.value;
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.picture = file;
  }
  onDismiss() {
    const target = "#CreateTicketModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }
  onSubmit() {
    if (this.form.value.subtype === 'subscription'){
      this.form.controls['order'].setValue(0);
    }
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const dataToSubmit = { ...this.form.value};

    const formData = new FormData();

    if (this.picture) {
      formData.append('attachment', this.picture);
    }

    formData.append('status', 'PENDING');
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post('tickets/', formData).subscribe((res: any) => {
      if(res.status === true) {
        const responseData = res.data;
        this.toastr.success("Ticket Added Successfully !!");
        // window.location.reload();
        this.valueChange.emit('ticket');
        this.form.reset();
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
