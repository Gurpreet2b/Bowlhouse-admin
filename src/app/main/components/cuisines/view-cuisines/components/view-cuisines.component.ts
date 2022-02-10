import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateCuisineComponent } from '../../create-cuisine/components/create-cuisine.component';
import { EditCuisineComponent } from '../../edit-cuisine/components/edit-cuisine.component';

@Component({
  selector: 'app-view-cuisines',
  templateUrl: './view-cuisines.component.html',
  styleUrls: ['./view-cuisines.component.css'],
})

export class ViewCuisinesComponent implements OnInit {
  currentPage: number = 1;
  cuisines: any = [];
  totalItems: number | undefined;
  cuisine_id: number | null = null;
  id: number | null = null;
  row: any = [];
  public loading = false;
  @ViewChild(EditCuisineComponent) child:any;
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

  ngAfterViewInit() {
    // child is set
    this.child?.doSomething();
    console.log(this.child?.doSomething())
    console.log(this.child);
  }

  ngOnInit(): void {
    this.cuisine_id = this.activeRoute.snapshot.params['id'];
    this.authService.SetRestaurantName(); 
    this.UserName = this.authService.getUserName();
    console.log(this.cuisine_id)
    this.getCuisines(1);
  }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getCuisines(event)
  }

  private getCuisines(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('cuisine/', null, { params: params }).subscribe((res: any) => {
      if(res.status === true){
        const responseData = res;
        this.cuisines = responseData.data.cuisine;
        this.totalItems = responseData.data.count;
        this.loading = false;
        if(this.cuisines.length === 0) {
          this.toastr.warning("No Record Found");
        }
        //  else {
       //   this.toastr.success("Cuisines List");
        // }
        console.log(res.data)
      } 
      
    });
  }

  
  ValueChanged(Cuisine_id: any) {
    if (Cuisine_id === 'Cuisine_id') {
      this.getCuisines(1);
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
      this.getCuisines(this.currentPage)
    });
  }
  onCreateCuisine() {
    const modalRef = this.modalService.open(CreateCuisineComponent);
  }

  onEditCuisine(id: any) {
    const modalRef = this.modalService.open(EditCuisineComponent);
    modalRef.componentInstance.cuisineId = id;
        
  }
}

