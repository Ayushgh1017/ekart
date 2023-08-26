import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent{

  finalAmount:number = 0;
  currentStep: 'shipping' | 'payment' = 'shipping';
  shippingCompleted = false;
  paymentCompleted = false;
  isFormValid = false;
  constructor( private fb: FormBuilder, private acRoute: ActivatedRoute,public dialog: MatDialog) {}

  ngOnInit() {

    this.acRoute.paramMap.subscribe(param=>{
      let amount= param.get('finalAmount');
      this.finalAmount = parseFloat(amount!);
    })
  }

  onShippingCompleted(isShippingValid: boolean) {
    this.shippingCompleted = isShippingValid;
    this.isFormValid = isShippingValid;
  }
  
  onPaymentCompleted(isPaymentValid: boolean) {
    this.paymentCompleted = isPaymentValid;
    this.isFormValid = isPaymentValid;
  }

  
  
  proceedToPayment() {
    if (this.shippingCompleted && this.paymentCompleted) {
      // Proceed to payment
      const dialogRef = this.dialog.open(MatDialogComponent, {
        width: '600px',
        height: '400px',
        data: {
          paymentAmount: this.finalAmount,
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
      });
  
      localStorage.removeItem('cart');
    }
  }
  

}