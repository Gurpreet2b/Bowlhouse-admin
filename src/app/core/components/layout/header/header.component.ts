import { DOCUMENT } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, DoCheck, Inject, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  public loading = false;
  totalItems: number | undefined;
  restaurants: any = [];
  // Maintain the sidebar state
  isIconOnly: boolean = false;
  form = new FormGroup({
    search: new FormControl(''),
  });
  name: string | null | undefined;
  public RestaurantName: any;
  NotificationList: any = [];

  constructor(
      @Inject(DOCUMENT) private document: Document, 
      private renderer: Renderer2,
      private authService: AuthService,
      private router: Router,
      private http: HttpService,
      private toastr: ToastrService,
     
    ) {}

  ngOnInit(): void {
    let UserName = this.authService.getUserName();
    this.name = UserName;
    this.getNotifications();
  }

  ngDoCheck(){
    this.RestaurantName = this.authService.TitleName;
  }
 

  /**
   * Toggle the sidebar
   */
  onToggleSidebar() {

    if (this.isIconOnly) {
      this.renderer.removeClass(this.document.body, 'sidebar-icon-only');
    } else {
      this.renderer.addClass(this.document.body, 'sidebar-icon-only');
    }

    this.isIconOnly = !this.isIconOnly;
   
  }


  /**
   * Logout the current session
   */
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
  onSubmit(formValue: any) {
    this.getRestaurant(1);
  }
  private getRestaurant(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`restaurant/?search=${search}`, null, { params: params }).subscribe((res: any) => {

      console.log(res)
      const responseData = res;
      this.restaurants = responseData.data.restaurant;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if(this.restaurants.length === 0) {
        this.toastr.warning("No Record Found");
      } 
      // else {
      //   this.toastr.success("Restaurant List");
      // }
    });
  }

  private getNotifications() {
    this.http.get(`notification/`, null,).subscribe((res: any) => {
      if(res.status === true) {
        this.NotificationList = res.data;
      }
      else {
        this.toastr.warning("Something went wrong !!");
      }
    }, (error: any) => {
      this.toastr.error(error.message);
    });
  }

}
