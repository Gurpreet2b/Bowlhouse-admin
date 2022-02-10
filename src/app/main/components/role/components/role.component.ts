import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  restaurant: any;
  public loading = false;
  FeaturedRestaurants: any = [];
  restaurant_id: number | null = null;
  totalItems: any;
  from: any;
  to: any;
  GroupList: any = [];
  PermissionList: any = [];
  StatusName: any;

  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute, private authService: AuthService,
    private dtPipe: DatePipe) { }

  ngOnInit(): void {
    this.restaurant_id = this.activeRoute.snapshot.params['id'] || 0;
    this.authService.SetRestaurantName();
    // this.getPermissions();
    this.getGroup();
  }

  ValueChanged(group: any) {
    if (group === 'group') {
      // this.getPermissions();
      this.getGroup();
    }
  }

  private getGroup() {
    this.http.get(`groups`).subscribe((res: any) => {
      const responseData = res;
      this.GroupList = responseData.data;
    })
  }

  IsChangeGroup(event: any) {
    this.loading = true;
    let groupId = event.target.value;
    this.groupId = groupId;
    this.http.get(`groups/${groupId}`).subscribe((res: any) => {
      this.loading = false;
      const responseData = res;
      this.PermissionList = responseData.data.tab_permissions;
    })
  }

  groupId: any;
  IsPermissionSubmit(){
    this.loading = true;
    // const formData = new FormData();

    // Object.keys(dataToSubmit).forEach(key => {
    //   if (!formData.has(key)) {
    //     formData.append(key, dataToSubmit[key])
    //   }
    // });
    this.http.post(`groups/${this.groupId}/set_tab_permission/`, {tab_list: this.PermissionList}).subscribe((res: any) => {
      this.loading = false;
      if (res.status === true) {
        this.toastr.success("Group Added Successfully !!");
      } else {
        this.toastr.warning('Something went wrong !!');
        this.loading = false;
      }
    }, error => {
      this.toastr.warning(error);
        this.loading = false;
    });
  }

  // private getPermissions() {
  //   this.loading = true;
  //   this.http.get(`featured_restaurant_list`, null,).subscribe((res: any) => {
  //     const responseData = res;
  //     this.FeaturedRestaurants = responseData.data;
  //     this.totalItems = responseData.count;
  //     this.loading = false;

  //     if (this.FeaturedRestaurants.length === 0) {
  //       this.toastr.warning("No Record Found");
  //     }
  //   });
  // }


}