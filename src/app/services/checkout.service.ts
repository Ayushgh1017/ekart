import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  calculateAmount(price: number, quantity: number):number{
    return price*quantity;
  }
}
