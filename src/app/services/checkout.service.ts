import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  calculateTotalAmount(obj: IProduct, delivery: number, tax: number): number {
    let totalAmount = 0;

    if (obj.quantity) {
      totalAmount = obj.price * obj.quantity;
    }

    return totalAmount + delivery + (totalAmount * tax / 100);
  }
}
