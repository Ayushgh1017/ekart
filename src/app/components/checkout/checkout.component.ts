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

  constructor(private productService: ProductsService, private acRoute: ActivatedRoute, private fb: FormBuilder, private checkout:CheckoutService) {}

  ngOnInit() {
    const storedCart = localStorage.getItem('checkout');
    
    if (storedCart) {
      const cartArray: { id: string, quantity: number }[] = JSON.parse(storedCart);

      const productIds = cartArray.map(item => item.id);

      this.quantity = cartArray[0].quantity;
      
      productIds.forEach(productId => {
        this.productService.getProductById(productId.toString()).subscribe({
          next: product => {
            this.products.push(product);
          },
          error: error => {
            console.log(`Can't find the product with ID ${productId}`, error);
          }
        });
      });
    }
    console.log("This is Product Array")
    console.log(this.products);
  
    this.shippingForm = this.fb.group({
    });
  
    this.paymentForm = this.fb.group({
    });
  }

  makePayment(){
    this.checkout.calculateAmount(this.products[0].price,this.quantity);
    localStorage.removeItem('cart');
    console.log("payment successfull");
  }
  
}
