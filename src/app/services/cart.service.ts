import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor() {}

  getCartObject(): { [id: string]: number } | null {
    const cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }
    return null;
  }
  addToCart(product: IProduct):number{
    const cart = this.getCartObject();
    const productId = product.id;
    if(cart){
      if (cart[productId]) {
        cart[productId] += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart[productId];
      }
    }
    return 0;
  }

  removeFromCart(product: IProduct): number {
    const cart = this.getCartObject();
    const productId = product.id;
    if (cart) {
      if (cart[productId]) {
        cart[productId] -= 1;
        if (cart[productId] === 0) {
          delete cart[productId]; 
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart[productId] || 0; 
      }
    }
    return 0;
  }

}

