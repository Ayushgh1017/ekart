import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  calculateTotalAmount(obj: IProduct, delivery: number, tax: number): number {
    let totalAmount = 0;
  
    if (obj.quantity !== undefined && obj.quantity !== null) {
      totalAmount = obj.price * obj.quantity;
    } else {
      totalAmount = obj.price * 1;
    }
  
    const finalAmount = totalAmount + delivery + (totalAmount * tax / 100);
    return parseFloat(finalAmount.toFixed(2));
  }
  
  
}
