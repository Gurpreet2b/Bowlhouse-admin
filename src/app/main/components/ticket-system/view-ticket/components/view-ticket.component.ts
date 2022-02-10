import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css'],
})

export class ViewTicketComponent implements OnInit {
  currentPage: number = 1;
  TicketSystemList: any = [];
  totalItems: number | undefined;
  cuisine_id: number | null = null;
  id: number | null = null;
  StatusData: any;
  TicketId: any;
  public loading = false;
  IsdisabledStatus: any;
  public start: any;
  public end: any;

  constructor(private modalService: NgbModal,
    private http: HttpService,
    private toastr: ToastrService, private dtPipe: DatePipe,
    private router: Router, private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let status = this.activeRoute.snapshot.params['Pending'];
    if (status === 'Pending'){
      this.StatusData = 'PENDING'
    }
    this.authService.SetRestaurantName('Recent Ticket');
    this.getTicketSystem(1);
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

    this.http.get(`tickets/?status=` + this.StatusData + `&search=`+ search + `&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.TicketSystemList = responseData.data.tickets;
        this.totalItems = responseData.data.count;
        this.loading = false;
        if (this.TicketSystemList.length === 0) {
          this.toastr.warning("No Record Found");
        }
      }

    });
  }

  IsStatus(val: any){
    this.ticketId = val.id;
    this.Status = val.status;
    this.IsdisabledStatus = val.status;
  }

  ticketId: any;
  Status: any
  OnStatusChange() {
    this.loading = true;
    const formData = new FormData();
    formData.append('status', this.Status);

    this.http.put(`tickets/` + this.ticketId + `/`, formData).subscribe((res: any) => {
      if (res.status === true) {
        const responseData = res;
        this.loading = false;
        this.toastr.success("Status Changed Successfully !!");
        this.getTicketSystem(1);
        this.onDismiss();
      } else {
        this.toastr.warning("Something went wrong !!");
      }
    });
  }

  onDismiss() {
    const target = "#ChangeStatusModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }


  ValueChanged(type: any) {
    if (type === 'ticket') {
      this.getTicketSystem(1);
    }
  }
  delete(id: number) {
    if (confirm('Are you sure delete this record?')) {
      this.onDeleteTicket(id);
    }
  }
  onDeleteTicket(id: number) {
    this.http.delete(`tickets/${id}/`).subscribe((res: any) => {
      if (res.status === true) {
        this.toastr.success("Deleted Successfully");
        this.getTicketSystem(this.currentPage)
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
  }

  onEditTicket(id: any, val: any) {
    this.TicketId = id;
    this.ticketId = val.id;
    this.Status = val.status;
    this.IsdisabledStatus = val.status;
  }
}

