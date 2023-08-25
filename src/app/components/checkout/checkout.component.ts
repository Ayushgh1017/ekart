import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  product!: IProduct;
  products: IProduct[] = [];
  id: string | null = null;
  shippingForm!: FormGroup;
  paymentForm!: FormGroup;
  quantity!: number;
  delivery:number = 3;
  tax:number = 2.5;
  finalAmount:number = 0;

  currentStep: 'shipping' | 'payment' = 'shipping';
  shippingCompleted = false;
  paymentCompleted = false;

  constructor( private fb: FormBuilder, private acRoute: ActivatedRoute,public dialog: MatDialog) {}

  ngOnInit() {

    this.acRoute.paramMap.subscribe(param=>{
      let amount= param.get('finalAmount');
      this.finalAmount = parseFloat(amount!);
    })
    console.log(this.finalAmount);;
  }

  onShippingCompleted(completed: boolean) {
    this.shippingCompleted = completed;
    if (completed) {
      this.currentStep = 'payment';
    }
    this.updatePaymentCompletion();
  }

  onPaymentCompleted(completed: boolean) {
    this.paymentCompleted = completed;
    this.updatePaymentCompletion();
  }

  updatePaymentCompletion() {
    if (this.shippingCompleted && this.paymentCompleted) {
      this.currentStep = 'payment';
    }
  }

  proceedToPayment() {
    console.log("Payment successfull");
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '600px',
      height: '400px',
      data: {
        paymentAmount: this.finalAmount,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }

  getShippingDetailsDisabled() {
    return this.currentStep!== 'shipping';
  }

  getPaymentDetailsDisabled() {
    return this.currentStep!== 'payment' ||!this.shippingCompleted;
  }
}