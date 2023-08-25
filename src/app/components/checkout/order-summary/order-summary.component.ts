import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  @Input() products!: IProduct[];
  @Input() finalAmount!: number;

  totalPrice: number = 0;

  constructor(private productService: ProductsService, private cartService: CartService) { }

  ngOnInit() {


    this.totalPrice = this.finalAmount;
    console.log("total price" , this.totalPrice);
  }
}