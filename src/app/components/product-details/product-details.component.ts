import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct'; 
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product!: IProduct;
  id: string | null= null;


  constructor(private productService:ProductsService, private acRoute:ActivatedRoute, private snackBar: MatSnackBar){}

  ngOnInit(){
    this.getIdFromRoute()
  }

  getIdFromRoute(){
    this.acRoute.paramMap.subscribe(param=>{
      this.id = param.get('id');
    })
    if(this.id){
      this.productService.getProductById(this.id!).subscribe({
        next: product =>{
          this.product = product;
        },
        error: error =>{
          console.log("Can find the product",error);
        }
      }
      );
    }
  }
  addToCart(): void {
    const id = this.product.id;
    const quantity = 1;
    let cartObj: { [id: number]: number } = {};
    if (localStorage.getItem('cart')) {
      cartObj = JSON.parse(localStorage.getItem('cart')!);
    }
    if (cartObj[id]) {
      cartObj[id] += quantity;
    } else {
      cartObj[id] = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cartObj));
    this.snackBar.open('Added to Cart', 'OK', { duration: 2000 });
  }

  buyNow(): void {
    const productId= this.product.id;
    const quantity = 1;
    const obj = {
      id:productId,
      quantity:quantity
    }
    let arr: any[] = [];
    arr.push(obj);
    localStorage.setItem('checkout',JSON.stringify(arr));
  }
  
}