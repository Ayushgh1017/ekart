import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/cart-module/cart.service';

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

  constructor(private cartService: CartService, private productService: ProductsService) { }

  ngOnInit() {
    this.totalPrice = this.finalAmount;
    this.getDetails();
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
