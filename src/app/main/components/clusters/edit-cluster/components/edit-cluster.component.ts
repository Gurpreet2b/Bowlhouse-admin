import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-cluster',
  templateUrl: './edit-cluster.component.html',
  styleUrls: ['./edit-cluster.component.css']
})
export class EditClusterComponent implements OnInit {
  picture: any;
  row: any = [];
  Lat: any;
  public loading = false;
  @Input() clusterId: any;
  @Output() valueChange = new EventEmitter();
  form = new FormGroup({
    picture: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    latitude: new FormControl('',),
    longitude: new FormControl('',),
    action: new FormControl('edit'),
  });

  doSomething() {
    console.log('test');
  }

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // console.log(this.clusterId);
    this.getCluster()
  }

  ImgPath: any;
  private getCluster() {
    this.loading = true;
    this.http.get(`cluster/?id=${this.clusterId}`).subscribe((res: any) => {
      this.row = res.data.cuisine;
      this.Lat = res.data.center.coordinates;
      this.ImgPath = res.data.image;
      this.form.patchValue(res.data);
      this.valueChange.emit('Cuisine_id');
      this.form.setValue({
        name: res.data.name,
        latitude: res.data.center.coordinates[1],
        longitude: res.data.center.coordinates[0],
        picture: res.data.image,
        action: 'edit'
      });

    })
  }


  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.picture = file;
    this.ImgPath = file;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formData = new FormData();
    if(this.form.value.latitude === '') {
      this.form.value.latitude = this.Lat[1];
    }
    if(this.form.value.longitude === '') {
      this.form.value.longitude = this.Lat[0];
    }
    if (this.picture) {
      formData.append('image', this.picture);
    } else {
      formData.append('image', '');
    }
    formData.append('cluster_id', this.clusterId);
    formData.append('latitude', this.form.value.latitude);
    formData.append('longitude', this.form.value.longitude);

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });

    this.loading = true;
    this.http.post(`cluster_approval/`, formData).subscribe((res: any) => {
      if(res.status === true) {
        const responseData = res.data;
        this.toastr.success("Updated Successfully");
        this.onDismiss();
        this.loading = false;
        this.router.navigateByUrl('/clusters');
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
  }

  onDismiss() {
    this.modalService.dismissAll();
  }

}
