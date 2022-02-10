import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// import { $ } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit, OnChanges {
  currentPage: number = 1;
  public loading = false;
  @Input() TicketId: any;
  IsType: any;
  ticketData: any;
  CommentList: any = [];
  totalItems: number | undefined;
  @Output() valueChange = new EventEmitter();
  Comment: any

  form = new FormGroup({
    topic: new FormControl(''),
    tag: new FormControl(''),
    type: new FormControl(''),
    order: new FormControl(''),
    subtype: new FormControl(''),
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

  ngOnChanges(){
    this.getTicket();
    // this.OnGetComment();
  }

  IsTypeChange(event: any){
    this.IsType = event.target.value;
  }


  private getTicket() {
    this.loading = true;
    this.http.get(`tickets/${this.TicketId}/`).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true) {
        let data = res.data.ticket;
        this.CommentList = res.data.comment;
        // this.CommentList.comment
        this.ticketData = data;
        this.IsType = data.type;
        // this.form.patchValue(res.data);
        this.form.setValue({
          topic: data.topic,
          tag: data.tag,
          type: data.type,
          subtype: data.subtype,
          order: data.order,
          message: data.message,
        });
      }
    })
  }

  
  onDismiss() {
    const target = "#EditTicketModal";
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
    formData.append('status', 'PENDING');
   
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.put(`tickets/${this.TicketId}/`, formData).subscribe((res: any) => {
      if(res.status === true) {
        this.toastr.success("Ticket Updated Successfully !!");
        this.valueChange.emit('ticket');
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

  onPageChange(event: number) {
    this.currentPage = event;
    // this.getTicketSystem(event)
  }

//   IsReadMore = false;
//   ReadMore(index: any) {
//     if(index) {
//       this.IsReadMore = !this.IsReadMore
//     }
//  }

  OnComment() {
    if (this.Comment === '' || this.Comment === undefined || this.Comment === null){
      this.toastr.warning("Please enter the comments");
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('comment', this.Comment);

    this.http.post(`tickets/${this.TicketId}/comment/` ,formData).subscribe((res: any) => {
      if (res.status === true) {
        this.loading = false;
        this.toastr.success("Comment Added Successfully !!");
        this.Comment = '';
        this.getTicket();
        // this.onDismissComment();
      } else {
        this.loading = false;
        this.toastr.warning("Something went wrong !!");
      }
    });
  }

  onDismissComment() {
    const target = "#CreateCommentModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
