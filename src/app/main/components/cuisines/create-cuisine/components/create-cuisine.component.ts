import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-cuisine',
  templateUrl: './create-cuisine.component.html',
  styleUrls: ['./create-cuisine.component.css']
})
export class CreateCuisineComponent implements OnInit {
  currentPage: number = 1;
  picture: File | undefined;
  public loading = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required]),
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

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.picture = file;
  }
  onDismiss() {
    this.modalService.dismissAll();
  }
  onSubmit() {
  this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const dataToSubmit = { ...this.form.value};


    const formData = new FormData();
    if (this.picture) {
      formData.append('picture', this.picture);
    }

    Object.keys(dataToSubmit).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, dataToSubmit[key])
      }
    });

    this.loading = true;
    this.http.post('cuisine_approval/', formData).subscribe((res: any) => {
      this.loading = false;
      if(res.status === true){
        this.toastr.success("Cuisine Added");
        this.onDismiss();
      } else {
        this.toastr.warning("Something went wrong !!");
      }
      // window.location.reload();
      //  this.router.navigateByUrl('/cuisines');
    });
  }

}
