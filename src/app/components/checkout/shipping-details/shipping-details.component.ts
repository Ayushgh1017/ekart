import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit, OnChanges {
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  @Output() shippingCompleted = new EventEmitter<boolean>();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnChanges(){
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      this.shippingCompleted.emit(true);
    }
  }

  checkShippingFormValidity() {
    const isFormValid = this.firstFormGroup.valid && this.secondFormGroup.valid;
    this.shippingCompleted.emit(isFormValid);
  }
}