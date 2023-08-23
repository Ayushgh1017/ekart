import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  @Input() product!: IProduct;
  quantity: number = 1;
  shippingCost: number = 5;
  total: number = 0;

  ngOnInit() {
    this.total = this.product.price * this.quantity + this.shippingCost;
  }
}