import { Injectable } from '@angular/core';

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
}
