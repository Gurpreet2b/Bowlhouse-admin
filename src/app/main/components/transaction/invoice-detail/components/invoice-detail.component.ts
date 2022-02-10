import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services';
// import { jsPDF } from 'jspdf';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;


order_id: number | null = null;
customer_id: number | null = null;
currentPage: number = 1;
totalItems: number | undefined;
orders: any[] = [];
id: number | null = null;



// makePDF() {
//   let pdf = new jsPDF('p', 'pt', 'a4');
//   pdf.html(this.el.nativeElement,{
//     callback: (pdf)=>{pdf.save("invoice.pdf")} 
// });
// }

constructor(
  private http: HttpService,
  private activeRoute: ActivatedRoute,
  private toastr: ToastrService,
) { }

ngOnInit(): void {
  this.order_id = this.activeRoute.snapshot.params['id'] || 0;
  this.getOrderHistory(1)
}


detailsData: any;
  private getOrderHistory(page: number) {
  let params = new HttpParams();
  params = params.append('page', page.toString())

  this.http.get(`order/${this.order_id}`, null, { params: params }).subscribe((res: any) => {
    const responseData = res;
    console.log(res)
    this.orders = responseData.data.inorder;
    this.detailsData = responseData.data;
    this.totalItems = responseData.data.count;
  });
}

onPageChange(event: number) {
  this.currentPage = event;
  this.getOrderHistory(event)
}

}
