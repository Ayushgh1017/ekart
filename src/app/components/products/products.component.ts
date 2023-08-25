import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: IProduct[]=[];
  router: any;
  constructor(private productService: ProductsService){}

  ngOnInit(){
    this.productService.fetchProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }
}
