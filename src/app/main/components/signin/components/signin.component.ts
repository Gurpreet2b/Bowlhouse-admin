import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  Permission: any = [];

  constructor(
    private router: Router,
    private http: HttpService,private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.form.markAllAsTouched();

    const formData = new FormData();

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });


    this.http.post('auth/', formData).subscribe((res: any) => {
      if(res.data.token.detail){
        this.toastr.warning(res.data.token.detail);
      }else{
        let UserName = res.data.user;
        this.authService.setUserName(UserName); 
        this.authService.setCurrentUser({ token: res.data.token.access });
        this.router.navigate(['/dashboard']);
        let RoleName = res.data.user_data.groups[0].name;
        this.authService.setRoleName(RoleName);
        this.Permission = res.data.user_data.groups[0].tab_permissions;
        localStorage.setItem(btoa("Permission"), btoa(JSON.stringify(this.Permission)));
      }
     
    });
  }

  // onSubmit() {

  //   this.form.markAllAsTouched(); 

  //   if (!this.form.valid) {
  //     return;
  //   }


  //   this.http.post('auth/', this.form.value).subscribe((res: any) => {
  //     this.authService.setCurrentUser({ token: res.access });
  //     this.router.navigate(['/dashboard']);
  //   });
  // }

}
