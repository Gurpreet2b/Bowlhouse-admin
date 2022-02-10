import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateCategoryComponent } from '../../create-category/components/create-category.component';
import { EditCategoryComponent } from '../../edit-category/components/edit-category.component';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  currentPage: number = 1;
  categories: any = [];
  totalItems: number | undefined;
  category_id: number | null = null;
  row: any = [];
  public loading = false;
  UserName: any;
  
  form = new FormGroup({
    picture: new FormControl(null),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private modalService: NgbModal,
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router,private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.category_id = this.activeRoute.snapshot.params['id'];
    this.authService.SetRestaurantName();
    this.UserName = this.authService.getUserName(); 
    console.log(this.category_id)
    this.getCategories(1);
  }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getCategories(event)
  }

  private getCategories(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('category/', null, { params: params }).subscribe((res: any) => {

      const responseData = res;
      this.categories = responseData.data.category;
      this.totalItems = responseData.data.count;
      if(this.categories.length === 0) {
        this.toastr.warning("No Record Found");
      } 
      // else {
      //   this.toastr.success("Category List");
      // }
      console.log(res.data)
      this.loading = false;
    });
  }
  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.onDeleteCategory(id);
    }
  }
  onDeleteCategory(id: number) {
    this.http.delete(`category/${id}/`).subscribe((res: any) => {
      this.toastr.warning("Deleted Successfully");
      this.getCategories(this.currentPage)
    });
  }
  onCreateCategory() {
    const modalRef = this.modalService.open(CreateCategoryComponent);
  }

  onEditCategory(id: number) {
    const modalRef = this.modalService.open(EditCategoryComponent);
    modalRef.componentInstance.categoryId = id;
  }
}

