import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-cuisine',
  templateUrl: './edit-cuisine.component.html',
  styleUrls: ['./edit-cuisine.component.css']
})
export class EditCuisineComponent implements OnInit {
  picture: File | undefined;
  row: any = [];
  public loading = false;
  @Input() cuisineId: any;
  @Output() valueChange = new EventEmitter();
  form = new FormGroup({
    picture: new FormControl('',[]),
    name: new FormControl('',[]),
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
    // console.log(this.cuisineId);
    this.getCuisine()
  }

  ImgPath: any;
  private getCuisine() {
    this.loading = true;
    this.http.get(`cuisine/${this.cuisineId}`).subscribe((res: any) => {
      this.row = res.data.cuisine;
      this.ImgPath = res.data.picture;
      this.form.patchValue(res.data);
      this.valueChange.emit('Cuisine_id');
      this.form.setValue({
        name: res.data.name,
        picture: res.data.picture,
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
    if (this.picture) {
      formData.append('picture', this.picture);
    } else {
      formData.append('picture', '');
    }
    formData.append('id', this.cuisineId);

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });

    this.loading = true;
    this.http.post(`cuisine_approval/`, formData).subscribe((res: any) => {
      const responseData = res.data;
      this.loading = false;
      if(res.status === true){
        this.toastr.success("Updated Successfully");
        this.router.navigateByUrl('/cuisines');
        this.onDismiss();
      } else {
        this.toastr.warning("Something went wrong !!");
      }
      
    });
  }

  private popultateForm(data: any) {

  }

  onDismiss() {
    this.modalService.dismissAll();
  }

}
