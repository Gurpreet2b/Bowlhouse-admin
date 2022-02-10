import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-chat',
  templateUrl: './view-chat.component.html',
  styleUrls: ['./view-chat.component.css'],
})

export class ViewChatComponent implements OnInit {
  currentPage: number = 1;
  ChatHistoryList: any = [];
  totalItems: number | undefined;
  cuisine_id: number | null = null;
  id: number | null = null;
  StatusData: any;
  ChatId: any;
  public loading = false;
  IsdisabledStatus: any;
  public start: any;
  public end: any;
  ticketId: any;
  Status: any;

  constructor(private modalService: NgbModal,
    private http: HttpService,
    private toastr: ToastrService, private dtPipe: DatePipe,
    private router: Router, private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // let status = this.activeRoute.snapshot.params['Pending'];
    // if (status === 'Pending'){
    //   this.StatusData = 'PENDING'
    // }
    this.authService.SetRestaurantName('Customer Grievance');
    this.StatusData = 'PENDING';
    this.getTicketSystem(1);
  }

  TabsFilterChange(val: any){
    if(val === 'Done') {
      this.StatusData = 'DONE';
      this.getTicketSystem(1);
    } else {
    this.StatusData = 'PENDING';
      this.getTicketSystem(1);
    }
  }

  form = new FormGroup({
    search: new FormControl(''),
  });

  from: any;
  to: any;
  IsRangeDate(event: any) {
    let dateRange = event.value;
    this.from = this.dtPipe.transform(dateRange[0], 'yyyy-MM-dd');
    this.to = this.dtPipe.transform(dateRange[1], 'yyyy-MM-dd');
    this.getTicketSystem(1);
    this.currentPage = 1;
  }

  onSubmit(formValue: any) {
    this.getTicketSystem(1);
  }

  IsStatusFilter(event: any){
    this.StatusData = event.target.value;
    this.getTicketSystem(1);
    this.currentPage = 1;
  }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getTicketSystem(event)
  }

  private getTicketSystem(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';

    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`chat?status=` + this.StatusData + `&search=`+ search + `&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.ChatHistoryList = responseData.data.chat_history;
        this.totalItems = responseData.data.count;
        this.loading = false;
      } else {
        this.loading = false;
        this.ChatHistoryList = res.data;
        this.totalItems = res.data;
        this.toastr.warning(res.error);
      }
    });
  }

  OnStatusReject() {
    this.loading = true;
    const formData = new FormData();
    formData.append('status', 'DONE');

    this.http.put(`chat/` + this.ChatId + `/`, formData).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.loading = false;
        this.toastr.success("Status Changed Successfully !!");
        this.getTicketSystem(1);
        this.raiseClose();
      } else {
        this.loading = false;
        this.toastr.warning("Something went wrong !!");
      }
    });
  }

  onDismiss() {
    const target = "#ChangeStatusModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

  raiseClose(){
    const target = "#EditViewModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }


  ValueChanged(type: any) {
    if (type === 'ticket') {
      this.getTicketSystem(1);
    }
  }

  onEditChat(id: any, val: any) {
    this.ChatId = id;
    this.ticketId = val.id;
    this.Status = val.status;
    this.IsdisabledStatus = val.status;
  }
}

