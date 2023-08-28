import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent{

  finalAmount:number = 0;
  shippingCompleted = false;
  paymentCompleted = false;
  checkoutForm! : FormGroup;

  

  constructor( private fb: FormBuilder, private acRoute: ActivatedRoute,public dialog: MatDialog) {}

  ngOnInit() {

    this.acRoute.paramMap.subscribe(param=>{
      let amount= param.get('finalAmount');
      this.finalAmount = parseFloat(amount!);
    })
  }

  onShippingCompleted(isShippingValid: boolean) {
    this.shippingCompleted = isShippingValid;
  }
  
  onPaymentCompleted(isPaymentValid: boolean) {
    this.paymentCompleted = isPaymentValid;

  }

  
  
  proceedToPayment() {
    if (this.shippingCompleted && this.paymentCompleted) {
      
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