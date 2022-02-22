import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// import { $ } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit {
  currentPage: number = 1;
  picture: File | undefined;
  public loading = false;
  IsType: any;
  @Output() valueChange = new EventEmitter();
  @Input() ChatId: any;
  customerId: any;
  ChatBot: any;
  UserList: any = [];

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
    this.getUserList();
  }

  ngOnChanges(){
    this.getTicket();
  }

  private getUserList() {
    this.http.get('users/', null).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.UserList = responseData.data.users;
      } else{
        this.toastr.error(res.error);
      }
    });
  }

  ImgPath: any;
  private getTicket() {
    this.loading = true;
    this.http.get(`chat/${this.ChatId}/`).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true) {
        let data = res.data;
        this.ImgPath = res.data.attachment;
        this.customerId = res.data.customer;
        this.ChatBot = data.chat;
        this.form.setValue({
          topic: data.subject,
          tag: '',
          type: '',
          subtype: '',
          order: data.order,
          message: '',
        });
      }
    })
  }

  IsTypeChange(event: any){
    this.IsType = event.target.value;
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.picture = file;
  }
  onDismiss() {
    const target = "#CreateChatModal";
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
    formData.append('grievance_id', this.ChatId);
    formData.append('customer', this.customerId);
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post('tickets/', formData).subscribe((res: any) => {
      if(res.status === true) {
        const responseData = res.data;
        this.toastr.success("Customer Grievance Added Successfully !!");
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
