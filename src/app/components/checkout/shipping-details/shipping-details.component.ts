import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent {
  shippingForm: FormGroup;
  @Output() shippingCompleted = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {
    this.shippingForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  ngOnInit() {
  }


onSubmitShipping() {
  this.shippingCompleted.emit(true);
}

}