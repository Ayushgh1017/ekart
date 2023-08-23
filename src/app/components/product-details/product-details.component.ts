import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct'; 
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product!: IProduct;
  id: string | null= null;
  constructor(private productService:ProductsService, private acRoute:ActivatedRoute){}
  ngOnInit(){
    this.acRoute.paramMap.subscribe(param=>{
      this.id = param.get('id');
    })
    if(this.id){
      this.productService.getProductById(this.id!).subscribe({
        next: product =>{
          this.product = product;
          console.log(product);
        },
        error: error =>{
          console.log("Can find the product",error);
        }
      }
      );
    }
  }

}