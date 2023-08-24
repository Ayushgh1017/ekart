import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';


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

  constructor( private fb: FormBuilder, private acRoute: ActivatedRoute) {}

  ngOnInit() {

    this.finalAmount = parseFloat(this.acRoute.snapshot.paramMap.get('finalAmount'));

    this.shippingForm = this.fb.group({
    });
  
    this.paymentForm = this.fb.group({
    });
  }

  
}
