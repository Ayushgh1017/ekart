import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent{
  paymentForm!: FormGroup;
  @Output() paymentCompleted = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      expirationDate: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
      paymentOption: ['credit', [Validators.required]]
    });
  }

  ngOnChanges(){
    this.onSubmitPayment();
  }

  onSubmitPayment(): void {
    if (this.paymentForm.valid) {
      this.paymentCompleted.emit(true);
    }
  }
}
