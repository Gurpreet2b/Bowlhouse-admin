import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-approvals',
  templateUrl: './menu-approvals.component.html',
  styleUrls: ['./menu-approvals.component.css'],
})

export class MenuApprovalsComponent implements OnInit {
  currentPage: number = 1;
  RefundApproval: any = [];
  PODApproval: any = [];
  FinanceApprovals: any = [];
  totalItems: number | undefined;
  refund_id: number | null = null;
  id: number | null = null;
  row: any = [];
  public loading = false;
  IsUserName: any;
  RoleName: any;
  IsActiveRefund: any = true;
  IsActiveCOD: any = '';

  constructor(private modalService: NgbModal,
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router,private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.refund_id = this.activeRoute.snapshot.params['id'];
    this.authService.SetRestaurantName('Approval System - Finance');
    this.IsUserName = this.authService.getUserName();
    this.RoleName = this.authService.getRoleName();
    this.getRefundApprovals(1);
    this.getPODApprovals(1);
    let notification = this.activeRoute.snapshot.params['refund'] || 0;
    if(notification === 'refund') {
      this.IsActiveRefund = true;
      this.getRefundApprovals(1);
    } else if (notification === 'COD') {
      this.IsActiveRefund = '';
      this.IsActiveCOD = true;
      this.getPODApprovals(1);
    }
  }

  onPageChange(event: any, data: any) {
    if(data === '1'){
      this.currentPage = event;
      this.getRefundApprovals(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getRefundApprovals(this.currentPage)
    }  
  }

  PageJump: any = 10;
  PageTotalRefund: any = [];
  private getRefundApprovals(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('refund/?status=INITIATED', null, { params: params }).subscribe((res: any) => {
      if(res.status === true){
        const responseData = res;
        this.RefundApproval = responseData.data.refund;
        this.totalItems = responseData.data.count;
        this.loading = false;

        this.PageTotalRefund = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalRefund.push(i);
        }

        if(this.RefundApproval.length === 0) {
          this.toastr.warning("No Record Found");
        }
      } 
    });
  }

  IsApproval(RefundId: any){
    this.loading = true;
    const formData = new FormData();
    formData.append('status', 'SUCCESS');

    this.http.patch(`refund/${RefundId}/`, formData).subscribe((res: any) => {
      this.loading = false;
      const responseData: any = res.data;
      if (res.status === true) {
        this.toastr.success('Refund Approved Successfully !!');
        this.loading = false;
        this.getRefundApprovals(1);
      } else {
        this.toastr.error(responseData.error);
        this.loading = false;
      }
    });
  }

  IsDiscard(RefundId: any){
    this.loading = true;
    const formData = new FormData();
    formData.append('status', 'PENDING');

    this.http.patch(`refund/${RefundId}/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success('Refund Discard Successfully');
        this.loading = false;
        this.getRefundApprovals(1);
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    });
  }

  onPageChangePOD(event: any, data: any) {
    if(data === '1'){
      this.currentPage = event;
      this.getPODApprovals(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getPODApprovals(this.currentPage)
    }  
  }

  PageTotalPOD: any = [];
  private getPODApprovals(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('payment/?status=SUCCESS_REVIEW', null, { params: params }).subscribe((res: any) => {
      if(res.status === true){
        const responseData = res;
        this.PODApproval = responseData.data.payment;
        this.totalItems = responseData.data.count;
        this.loading = false;

        this.PageTotalPOD = [];
        let Count = responseData.data.count / 10;
        for (let i = 0; i < Count; i += this.PageJump) {
          this.PageTotalPOD.push(i);
        }
        if(this.PODApproval.length === 0) {
          this.toastr.warning("No Record Found");
        }
      } 
    });
  }

  IsPODApproval(PODId: any){
    this.loading = true;
    const formData = new FormData();
    formData.append('id', PODId);
    formData.append('status', 'SUCCESS');
    // let params = {
    //   id: PODId,
    //   status: 'SUCCESS'
    // }

    this.http.post(`payment/change_status/`, formData).subscribe((res: any) => {
      this.loading = false;
      const responseData: any = res.data;
      if (res.status === true) {
        this.toastr.success('POD Approved Successfully !!');
        this.loading = false;
        this.getPODApprovals(1);
      } else {
        this.toastr.error(responseData.error);
        this.loading = false;
      }
    });
  }

  IsPODDiscard(PODId: any){
    this.loading = true;
    const formData = new FormData();
    formData.append('id', PODId);
    formData.append('status', 'PAID_ON_DELIVERY');

    this.http.post(`payment/change_status/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success('POD Discard Successfully');
        this.loading = false;
        this.getPODApprovals(1);
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    });
  }

}

