import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { CheckoutService } from './checkout.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  providers: [CartService,CheckoutService]
})
export class CartModuleModule { }
