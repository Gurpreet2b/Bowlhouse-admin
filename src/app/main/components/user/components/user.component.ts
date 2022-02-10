import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  restaurant: any;
  public loading = false;
  UserList: any = [];
  restaurant_id: number | null = null;
  totalItems: any;
  currentPage: number = 1;

  StatusName: any;
  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute, private authService: AuthService,
    private dtPipe: DatePipe) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName(); 
    this.getUsers(1);
  }

  ValueChanged(user: any) {
    if (user === 'user') {
      this.getUsers(1);
    }
  }

  PageJump: any = 10;
  PageTotalNumber: any = [];
  private getUsers(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())
    this.http.get(`users`, null, { params: params }).subscribe((res: any) => {
      const responseData = res;
      this.UserList = responseData.data.users;
      this.totalItems = responseData.data.count;
      this.loading = false;
      this.PageTotalNumber = [];
      let Count = responseData.data.count / 10;
      for (let i = 0; i < Count; i += this.PageJump) {
        this.PageTotalNumber.push(i);
      }
      if (this.UserList.length === 0) {
        this.toastr.warning("No Record Found");
      }
    });
  }

  onPageChange(event: any, data: any) {
    if (data === '1') {
      this.currentPage = event;
      this.getUsers(event)
    } else {
      this.currentPage = Number(event.target.value);
      this.getUsers(this.currentPage)
    }
  }


}