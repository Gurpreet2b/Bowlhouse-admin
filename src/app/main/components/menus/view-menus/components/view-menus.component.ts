import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-view-menus',
  templateUrl: './view-menus.component.html',
  styleUrls: ['./view-menus.component.css']
})
export class ViewMenusComponent implements OnInit {

  restaurant_id: number | null = null;
  foodmenu_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  menuItems: any = [];
  menudata: any;
  public loading = false;
  id: number | null = null;
  form = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.foodmenu_id = this.activeRoute.snapshot.params['menuItemId'] || 0;
    this.restaurant_id = this.activeRoute.snapshot.params['restaurantId'] || 0;
    this.getMenuItems(1)
  }
  onSubmit(formValue: any) {
    this.getMenuItems(1);
  }

  RestaurantName: any;
  PageJump: any = 10;
  PageTotalNumberMenu: any = [];
  private getMenuItems(page: number) {
    this.loading = true;
    const formValue = this.form.value;
    const search = formValue.search || '';
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`foodmenu/?restaurant=${this.restaurant_id}&search=${search}`, null, { params: params }).subscribe((res: any) => {
      this.loading = false;
      const responseData = res;
      this.menuItems = responseData.data;
      
      this.PageTotalNumberMenu = [];
      let Count = responseData.data.length / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumberMenu.push(i);
      }
      if(this.menuItems.length === 0) {
        this.toastr.warning("No Record Found");
        this.loading = false;
      } else {
        this.RestaurantName = responseData.data[0].restaurant.name;
        this.auth.SetRestaurantName(`Menu Items - ${this.RestaurantName}`); 
        this.totalItems = responseData.data.count;
        this.loading = false;
      }
      // else {
      //   this.toastr.success("Menu List");
      // }
    });
  }
  
  onPageChange(event: any, data: any) {
    if(data === '1'){
      this.currentPage = event;
      this.getMenuItems(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getMenuItems(this.currentPage)
    }  
  }
  
  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.onDeleteMenuItem(id);
    }
  }
  onDeleteMenuItem(id: number) {
    this.http.delete(`foodmenu/${id}/`).subscribe((res: any) => {
      this.getMenuItems(this.currentPage)
      this.toastr.warning("Deleted Successfully");
    });
  }

}