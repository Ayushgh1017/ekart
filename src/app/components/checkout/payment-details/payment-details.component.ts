import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  paymentForm!: FormGroup;
  @Output() paymentCompleted = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
      paymentOption: ['credit', Validators.required] // Default to "credit"
    });
  }

  onSubmitPayment(): void {
    if (this.paymentForm.valid) {
      console.log('Payment form submitted:', this.paymentForm.value);
      this.paymentCompleted.emit(true);
    }
  }

}