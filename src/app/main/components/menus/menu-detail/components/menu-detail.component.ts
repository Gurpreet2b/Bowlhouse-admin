import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {

  restaurant_id: number | null = null;
  customer_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  MenuDetails: any;
  MenuPreviousDetails: any;
  detail: any
  id: number | null = null;
  public loading = false;
  ApproveValue: any;
  foodMenuId: any;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['menu_id'] || 0;
    this.auth.SetRestaurantName(`Food Menu Approval`); 
    // this.ApproveValue = this.activeRoute.snapshot.params['approval'];
    // if(this.ApproveValue === 'approval') {
      this.getApprovalHistory();
    // } else {
    //   this.getRestHistory();
    // }
  }

  private getApprovalHistory() {
    this.loading = true;
    this.http.get(`foodmenu_approval/${this.restaurant_id}/`).subscribe((res: any) => {
      this.loading = false;
      this.MenuDetails = res.data;
      this.foodMenuId = res.data.foodmenu_id;
      if(this.MenuDetails.action === 'edit') {
        this.getPreviousMenu();
        
      }
    });
  }

  private getPreviousMenu() {
    this.loading = true;
    this.http.get(`foodmenu/${this.foodMenuId}/`).subscribe((res: any) => {
      this.loading = false;
      this.MenuPreviousDetails = res.data;
    });
  }

  IsApproval(){
    this.loading = true;
    const formData = new FormData();
    this.http.post(`foodmenu_approval/${this.restaurant_id}/approved/`, formData).subscribe((res: any) => {
      this.loading = false;
      const responseData: any = res.data;
      if (responseData.status === true) {
        this.toastr.success('Food Menu Approved');
        this.router.navigateByUrl(`/restaurants/menu/${this.MenuDetails.restaurant.id}`);
        this.loading = false;
      } else {
        this.toastr.error(responseData.error);
        this.loading = false;
      }
    });
  }

  // IsDiscard(){
  //   this.loading = true;
  //   this.http.delete(`foodmenu_approval/${this.restaurant_id}/`).subscribe((res: any) => {
  //     this.loading = false;
  //     if (res.status === true) {
  //       this.toastr.success('Food Menu Deleted Successfully');
  //       this.router.navigateByUrl(`/restaurant-approvals`);
  //       this.loading = false;
  //     } else {
  //       this.toastr.error(res.error);
  //       this.loading = false;
  //     }
  //   });
  // }

  comment: any;
  IsDiscard(){
    if(this.comment === '' || this.comment === undefined || this.comment === null){
      this.toastr.warning('Please enter reason for Food Menu discard');
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('approved_status', 'REJECTED');
    formData.append('discard_message', this.comment);
    this.http.patch(`foodmenu_approval/${this.restaurant_id}/`, formData).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success('Food Menu Discard Successfully');
        this.onFoodMenuDismiss();
        this.router.navigateByUrl(`/restaurant-approvals`);
        this.loading = false;
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    });
  }

  onFoodMenuDismiss() {
    const target = "#DiscardModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

}
