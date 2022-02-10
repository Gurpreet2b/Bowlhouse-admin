import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EditHeaderContentsComponent } from '../../edit-header-content/components/edit-header-content.component';

@Component({
  selector: 'app-view-header-content',
  templateUrl: './view-header-content.component.html',
  styleUrls: ['./view-header-content.component.css'],
})

export class ViewHeaderContentComponent implements OnInit {
  currentPage: number = 1;
  HeaderContentList: any = [];
  totalItems: number | undefined;
  cuisine_id: number | null = null;
  id: number | null = null;
  row: any = [];
  public loading = false;
  // @ViewChild(EditCuisineComponent) child:any;
  

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
    this.cuisine_id = this.activeRoute.snapshot.params['id'];
    this.authService.SetRestaurantName(); 
    console.log(this.cuisine_id)
    this.getHeaderContent(1);
  }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getHeaderContent(event)
  }

  private getHeaderContent(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('customer_app_title/', null, { params: params }).subscribe((res: any) => {
      if(res.status === true){
        const responseData = res;
        this.HeaderContentList = responseData.data.customer_app_title;
        this.totalItems = responseData.data.count;
        this.loading = false;
        if(this.HeaderContentList.length === 0) {
          this.toastr.warning("No Record Found");
        }
        //  else {
       //   this.toastr.success("Cuisines List");
        // }
        console.log(res.data)
      } 
      
    });
  }

  
  ValueChanged(headerContent: any) {
    if (headerContent === 'headerContent') {
      this.getHeaderContent(1);
    }
  }
  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.onDeleteCuisine(id);
    }
  }
  onDeleteCuisine(id: number) {
    this.http.delete(`cuisine/${id}/`).subscribe((res: any) => {
      this.toastr.warning("Deleted Successfully");
      this.getHeaderContent(this.currentPage)
    });
  }
  onCreateCuisine() {
    // const modalRef = this.modalService.open(CreateCuisineComponent);
  }

  onEditCuisine(id: any) {
    const modalRef = this.modalService.open(EditHeaderContentsComponent);
    modalRef.componentInstance.headerId = id;
        
  }
}

