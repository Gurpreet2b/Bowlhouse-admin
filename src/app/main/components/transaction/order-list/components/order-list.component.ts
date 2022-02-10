import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@core/services';

import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import * as XLSX from 'xlsx';
// const Excel_Extension ='.xlsx'
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  // @ViewChild('htmlData', { static: false })
  // htmlData!: ElementRef;
  // @ViewChild('htmlData', { static: false }) el!: ElementRef;

  public loading = false;
  transaction_id: number | null = null;
  currentPage: number = 1;
  totalItems: number | undefined;
  restaurants: any = [];
  detail: any = [];
  tbody: any;
  thead: any;
  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  exportToExcel() {
    var element = document.getElementById('htmlData');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // // Write some data headers.
    // WorkSheet.write('A1', 'Item', bold)
    // WorkSheet.write('B1', 'Cost', bold)
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'TransactionToOrderList.xlsx');
  }


  public captureScreen() {
    var data = document.getElementById('htmlData') as any;
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;


      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  

      var position = 1;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('File.pdf'); // Generated PDF   
    });
  }


  // captureData()
  // {
  //   var data = document.getElementById('htmlData') as any;
  //   html2canvas(data).then(function(canvas) {
  //     var genImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  //     window.location.href= genImage
  // }
  // public openPDF():void {
  //   let DATA = document.getElementById('htmlData') as any;

  //   html2canvas(DATA).then(canvas => {

  //       let fileWidth = 180;
  //       let fileHeight = canvas.height * fileWidth / canvas.width;

  //       const FILEURI = canvas.toDataURL('image/png')
  //       let PDF = new jsPDF('p', 'mm', 'a4');
  //       let position = 25;
  //       PDF.addImage(FILEURI, 'png', 20, position, fileWidth, fileHeight)

  //       PDF.save('reports.pdf');
  //   });     
  //   }

  form = new FormGroup({
    status: new FormControl(''),
    bank_transaction_id: new FormControl('', [Validators.required]),
  });
  constructor(private http: HttpService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    // private pdfService: AngularCreatePdfService,
  ) { }


  ngOnInit(): void {
    this.transaction_id = this.activeRoute.snapshot.params['id'] || 0;
    this.getRestaurants(1);
    this.getStatus();
  }



  private getStatus() {
    this.http.get(`restaurant_transaction/${this.transaction_id}/`).subscribe((res: any) => {
      this.detail = res.data.transaction;
      this.form.patchValue(res.data);
      this.form.setValue({
        status: this.detail.status,
        bank_transaction_id: this.detail.bank_transaction_id,
      });
    })
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    if(this.form.value.bank_transaction_id === '' || this.form.value.bank_transaction_id === null || this.form.value.bank_transaction_id === undefined
    || this.form.value.bank_transaction_id === 'null'){
      this.toastr.warning("Please enter your bank transaction Id");
      return;
    }
    console.log(this.form)
    if (!this.form.valid) {
      return;
    }

    const formData = new FormData();

    Object.keys(this.form.value).forEach(key => {
      if (!formData.has(key)) {
        formData.append(key, this.form.value[key])
      }
    });


    this.http.patch(`restaurant_transaction/${this.transaction_id}/`, formData).subscribe((res: any) => {
      const responseData = res.data;
      this.toastr.success("Updated Successfully");
      this.onDismiss();
    });
  }
  onDismiss() {
    const target = "#BankModal";
    $(target).hide();
    $('.modal-backdrop').remove();
  }

  private getRestaurants(page: number) {
    this.loading = true;
    let params = new HttpParams();
    params = params.append('page', page.toString())

    this.http.get(`restaurant_transaction/${this.transaction_id}`, null, { params: params }).subscribe((res: any) => {
      // console.log(res)
      const responseData = res;
      this.restaurants = responseData.data.payments;
      console.log(this.restaurants)
      this.detail = responseData.data.transaction;
      this.totalItems = responseData.data.count;
      this.loading = false;
      if (this.restaurants.length === 0) {
        this.toastr.warning("No Record Found");
      } 
      // else {
      //   this.toastr.success("Transaction Detail");
      // }
    });
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getRestaurants(event)
  }
}

