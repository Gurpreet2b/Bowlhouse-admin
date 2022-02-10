import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  public loading = false;
  
   form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    action: new FormControl('add'),
  });

  constructor(
    private http: HttpService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onDismiss() {
    this.modalService.dismissAll();
  }
  onSubmit() {

    if (!this.form.valid) {
      return;
    }
    const dataToSubmit = { ...this.form.value};
    const formData = new FormData();  
    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post('category_approval/', formData).subscribe((res: any) => {
      const responseData = res.data;
      this.loading = false;
      if(res.status === true){
        this.toastr.success("Category Added Successfully !!");
        this.onDismiss();
        // window.location.reload();
      } else {
        this.toastr.warning("Something went wrong !!");
      }
      // this.router.navigateByUrl('/category');
    });
  }

}
