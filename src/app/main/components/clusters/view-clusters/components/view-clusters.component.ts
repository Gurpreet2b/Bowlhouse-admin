import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateClusterComponent } from '../../create-cluster/components/create-cluster.component';
import { EditClusterComponent } from '../../edit-cluster/components/edit-cluster.component';

@Component({
  selector: 'app-view-clusters',
  templateUrl: './view-clusters.component.html',
  styleUrls: ['./view-clusters.component.css'],
})

export class ViewClustersComponent implements OnInit {
  currentPage: number = 1;
  ClusterList: any = [];
  totalItems: number | undefined;
  cuisine_id: number | null = null;
  id: number | null = null;
  row: any = [];
  public loading = false;
  @ViewChild(EditClusterComponent) child:any;
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
    this.getCluster(1);
  }
  onPageChange(event: number) {
    this.currentPage = event;
    this.getCluster(event)
  }

  private getCluster(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get('cluster/', null, { params: params }).subscribe((res: any) => {
      if(res.status === true){
        const responseData = res;
        this.ClusterList = responseData.data.cluster;
        this.totalItems = responseData.data.count;
        this.loading = false;
        if(this.ClusterList.length === 0) {
          this.toastr.warning("No Record Found");
        }
      } else {
        this.loading = false;
          this.toastr.warning(res.error);
        }
      
    }, (error: any) => {
      this.loading = false;
      this.toastr.error(error);
    });
  }

  
  ValueChanged(type: any) {
    if (type === 'cluster') {
      this.getCluster(1);
    }
  }
  delete(id: number) {
    if (confirm('Are you sure delete this record?')) {
      this.onDeleteCuisine(id);
    }
  }
  onDeleteCuisine(id: number) {
    this.http.delete(`cluster/${id}/`).subscribe((res: any) => {
      if(res.status === true) {
        this.toastr.success("Deleted Successfully");
        this.getCluster(this.currentPage)
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
  }

  onEditCuisine(id: any) {
    const modalRef = this.modalService.open(EditClusterComponent);
    modalRef.componentInstance.clusterId = id;
        
  }
}

