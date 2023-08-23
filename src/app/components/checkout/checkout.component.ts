import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  product!: IProduct;
  id:string | null = null;
  shippingForm!: FormGroup;
  paymentForm!: FormGroup;
  quantity!: number;

  constructor(private productService:ProductsService, private acRoute:ActivatedRoute,private fb: FormBuilder){}
  ngOnInit(){
    this.acRoute.paramMap.subscribe(param=>{
      this.id = param.get('id');
    })
    if(this.id){
      this.productService.getProductById(this.id!).subscribe({
        next: product =>{
          this.product = product;

        },
        error: error =>{
          console.log("Can find the product",error);
        }
      }
      );
    }
  }
  onSubmitShipping() {
    console.log(this.shippingForm.value);
  }

  onSubmitPayment() {
    console.log(this.shippingForm.value);
  }
}
