import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  name: string | null | undefined;
  // public sidebarMinimized = false;
  Permission: any = [];
  RoleName: any;

  constructor( private authService: AuthService,) { }
  ngOnInit(): void {
    let UserName = this.authService.getUserName();
    this.Permission = this.authService.getPermission();
    this.name = UserName;
    this.RoleName = this.authService.getRoleName();
  }
  // toggleMinimize(e: any) {
  //   this.sidebarMinimized = e;
  // }

}
