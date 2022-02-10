import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-archive-ticket',
  templateUrl: './archive-ticket.component.html',
  styleUrls: ['./archive-ticket.component.css'],
})

export class ArchiveTicketComponent implements OnInit {
  currentPage: number = 1;
  TicketSystemList: any = [];
  totalItems: number | undefined;
  id: number | null = null;
  // StatusData: any;
  TicketId: any;
  public loading = false;
  from: any;
  to: any;
  public start: any;
  public end: any;

  constructor(private modalService: NgbModal,
    private http: HttpService,
    private toastr: ToastrService, private dtPipe: DatePipe,
    private router: Router, private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.SetRestaurantName('Archival Ticket');

    let fromDate = new Date();
    let from = new Date(fromDate);
    from.setDate(from.getDate() - 7);
    // this.from = this.dtPipe.transform(from, 'yyyy-MM-dd');

    let to = new Date(fromDate);
    to.setDate(to.getDate());
    // this.to = this.dtPipe.transform(to, 'yyyy-MM-dd');

    this.getTicketSystem(1);
  }

  // IsStatusFilter(event: any){
  //   this.StatusData = event.target.value;
  //   this.getTicketSystem(1);
  // }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getTicketSystem(event)
  }

  form = new FormGroup({
    search: new FormControl(''),
  });

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

  private getTicketSystem(page: number) {

    const formValue = this.form.value;
    const search = formValue.search || '';

    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`tickets/?status=DONE` + `&search=`+ search + `&from=` + this.from + `&to=` + this.to, null, { params: params }).subscribe((res: any) => {
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

  onEditTicket(id: any) {
    this.TicketId = id
  }
}

