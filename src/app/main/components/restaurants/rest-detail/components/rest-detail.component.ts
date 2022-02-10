import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rest-detail',
  templateUrl: './rest-detail.component.html',
  styleUrls: ['./rest-detail.component.css']
})
export class RestDetailComponent implements OnInit {

  restaurant_id: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  restaurants: any;
  restaurantPrevious: any;
  detail: any
  id: number | null = null;
  public loading = false;
  ApproveValue: any;
  restaurantApprovId: any;
  comment: any;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService, private router: Router
  ) { }

  ngOnInit(): void {    
    this.ApproveValue = this.activeRoute.snapshot.params['approval'];
    if(this.ApproveValue === 'approval') {
      this.restaurantApprovId = this.activeRoute.snapshot.params['id'] || 0;
      this.getApprovalHistory();
      this.auth.SetRestaurantName(`Restaurant Approval`); 
    } else {
      this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
      this.getRestHistory();
      this.getBankHistory();
      // this.auth.SetRestaurantName(`${this.restaurantPrevious.name} - Restaurant Detail`); 
    }
  }

  private getApprovalHistory() {
    this.loading = true;
    this.http.get(`restaurant_approval/${this.restaurantApprovId}/`).subscribe((res: any) => {
      this.loading = false;
      this.restaurants = res.data;
      this.restaurant_id = this.restaurants.restaurant_id;
      if(this.restaurants.action === 'edit') {
        this.getRestHistory();
        
      }
    });
  }

  private getRestHistory() {
    this.loading = true;
    this.http.get(`restaurant/${this.restaurant_id}/`).subscribe((res: any) => {
      this.loading = false;
      this.restaurantPrevious = res.data;
      if(this.restaurants?.action === 'edit') {
        this.auth.SetRestaurantName(`Restaurant Approval`); 
      } else {
        this.auth.SetRestaurantName(`${this.restaurantPrevious.name} - Restaurant Detail`); 
      }
    });
  }

  private getBankHistory(){
    this.loading = true;
    this.http.get(`restaurant/${this.restaurant_id}/bank_details/`).subscribe((res: any) => {
      console.log(res)
      this.loading = false;
      this.detail = res.data;
      // console.log(this.detail)
    });
  }

  IsApproval(){
    this.loading = true;
    const formData = new FormData();
    this.http.post(`restaurant_approval/${this.restaurantApprovId}/approved/`, formData).subscribe((res: any) => {
      this.loading = false;
      const responseData: any = res.data;
      if (res.status === true) {
        this.toastr.success('Restaurant Approved');
        this.router.navigateByUrl(`/restaurants`);
        this.loading = false;
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    },(error: any) =>{
      this.toastr.error(error);
      this.loading = false;
    });
  }

  IsDiscard(){
    if(this.comment === '' || this.comment === undefined || this.comment === null){
      this.toastr.warning('Please enter reason for Restaurant discard');
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('approved_status', 'REJECTED');
    formData.append('discard_message', this.comment);
    this.http.patch(`restaurant_approval/${this.restaurantApprovId}/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success('Restaurant Discard Successfully');
        this.onRestDismiss();
        this.router.navigateByUrl(`/restaurant-approvals`);
        this.loading = false;
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    });
  }

  onRestDismiss() {
    const target = "#DiscardModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
