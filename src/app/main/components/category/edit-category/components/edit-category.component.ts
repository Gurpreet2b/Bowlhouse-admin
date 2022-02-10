import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category_id: number | null = null;
  id: number | null = null;
  row: any = [];
  @Input() categoryId: any;


  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    action: new FormControl('edit'),
  });

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.category_id = this.activeRoute.snapshot.params['id'];
    console.log(this.categoryId)

    this.getCategory();
  }


 private getCategory() {
    this.http.get(`category/${this.categoryId}`).subscribe((res: any) => {
      this.form.patchValue(res.data);
      console.log(res.data)
    })
  }


  onSubmit() {

    if (!this.form.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('category_id', this.categoryId);

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });


    this.http.post(`category_approval/`, formData).subscribe((res: any) => {
      if(res.status === true){
        this.toastr.success("Updated Successfully");
        this.onDismiss();
        this.router.navigateByUrl('/category');
        // window.location.reload();
      } else {
        this.toastr.warning("Something went wrong !!");
      }
      
    });
  }

  onDismiss() {
    this.modalService.dismissAll();
  }

}
