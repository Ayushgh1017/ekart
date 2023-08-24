import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  @Input() products!: IProduct[];
}
