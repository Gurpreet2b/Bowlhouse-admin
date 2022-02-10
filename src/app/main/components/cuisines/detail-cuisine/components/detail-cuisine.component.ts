import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-cuisine',
  templateUrl: './detail-cuisine.component.html',
  styleUrls: ['./detail-cuisine.component.css']
})
export class DetailCuisineComponent implements OnInit {
  restaurant_id: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  CuisineDetails: any;
  CuisinePreviousDetails: any;
  detail: any
  id: number | null = null;
  public loading = false;
  ApproveValue: any;
  cuisineId: any;
  comment: any;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.auth.SetRestaurantName(`Cuisine Approval`); 
    // this.ApproveValue = this.activeRoute.snapshot.params['approval'];
    // if(this.ApproveValue === 'approval') {
      this.getApprovalCuisine();
    // } else {
    //   this.getRestCuisine();
    // }
  }

  private getApprovalCuisine() {
    this.loading = true;
    this.http.get(`cuisine_approval/${this.restaurant_id}/`).subscribe((res: any) => {
      this.loading = false;
      this.CuisineDetails = res.data;
      this.cuisineId = res.data.cuisine_id;
      if(this.CuisineDetails.action === 'edit'){
        this.getPreviousCuisine();
      }
    });
  }

  private getPreviousCuisine() {
    this.loading = true;
    this.http.get(`cuisine/${this.cuisineId}/`).subscribe((res: any) => {
      this.loading = false;
      this.CuisinePreviousDetails = res.data;
    });
  }

  IsApproval(){
    this.loading = true;
    const formData = new FormData();
    this.http.post(`cuisine_approval/${this.restaurant_id}/approved/`, formData).subscribe((res: any) => {
      this.loading = false;
      const responseData: any = res.data;
      if (responseData.status === true) {
        this.toastr.success('Cuisine Approved Successfully !!');
        this.router.navigateByUrl(`/restaurant-approvals`);
        this.loading = false;
      } else {
        this.toastr.error(responseData.error);
        this.loading = false;
      }
    });
  }

  IsDiscard(){
    if(this.comment === '' || this.comment === undefined || this.comment === null){
      this.toastr.warning('Please enter reason for Cuisine discard');
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('approved_status', 'REJECTED');
    formData.append('discard_message', this.comment);
    this.http.patch(`cuisine_approval/${this.restaurant_id}/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success('Cuisine Discard Successfully');
        this.onCuisineDismiss();
        this.router.navigateByUrl(`/restaurant-approvals`);
        this.loading = false;
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    });
  }

  onCuisineDismiss() {
    const target = "#DiscardModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
