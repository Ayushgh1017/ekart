import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/cart-module/cart.service';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/cart-module/checkout.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  product!: IProduct;
  products: IProduct[] = [];
  @Input() finalAmount!: number;

  totalPrice: number = 0;

  constructor(private cartService: CartService, private productService: ProductsService, private route:ActivatedRoute, private checkoutService:CheckoutService) { }

  ngOnInit() {
    const action = this.route.snapshot.data['action'];
    if (action === 'buy') {
      this.getSingleDetails();
      this.totalPrice = this.products[0].price;
    } else if (action === 'cart') {
      this.getDetails();
      this.totalPrice = this.finalAmount;
    }
  }

  getSingleDetails(){
    const cartObj = this.cartService.getBuyNowArray();
    if(cartObj){
      const productId = cartObj[0].id;
      const quantity = cartObj[0].quantity;

      this.productService.getProductById(productId.toString()).subscribe({
        next: (product:IProduct) =>{
          product.quantity = quantity;
          this.products.push(product);
        }
      })
    }
  }

  getDetails(){
    const cartObj = this.cartService.getCartObject();
    if (cartObj){
      const productIds = Object.keys(cartObj);
      productIds.forEach(productId => {
        this.productService.getProductById(productId).subscribe({
          next: (product: IProduct) => {
            const quantity = cartObj[productId];
            product.quantity = quantity;
            this.products.push(product);
          },
        }); 
      });
    }
  }
}
