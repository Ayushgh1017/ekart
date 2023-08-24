import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  product!: IProduct;
  products: IProduct[]=[];
  constructor(private productService: ProductsService,private cartService: CartService){}

  ngOnInit(){
     const cartObj = this.cartService.getCartObject();
     if (cartObj){
      const productIds = Object.keys(cartObj);
      productIds.forEach(productId => {
        this.productService.getProductById(productId).subscribe({
          next: product => {
            const quantity = cartObj[productId];
            product.quantity = quantity;
            this.products.push(product);
          },
          error: error => {
            console.log(`Can't find the product with ID ${productId}`, error);
          }
        });
      });
     }
  }
  addToCart(product: IProduct) {
    product.quantity =  this.cartService.addToCart(product);
    
  }

  removeFromCart(product: IProduct) {
    product.quantity = this.cartService.removeFromCart(product);
    if (product.quantity === 0) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index!== -1) {
        this.products.splice(index, 1);
      }
    }
  }
}
