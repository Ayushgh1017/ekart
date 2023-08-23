import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/IProduct';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://fakestoreapi.com/products';
  private products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.apiUrl).pipe(
      map(products => products.map(product=> ({
        id: product.id,
        title:product.title,
        price: product.price,
        description:product.description,
        category: product.category,
        image: product.image,
        rating: product.rating
      })))
    )
  }

  getProducts():IProduct[]{
    return this.products;
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`).pipe(
      map(product => {
        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: product.rating
        };
      }),
      catchError((error: any) => {
        console.error(error);
        throw new Error(`Failed to fetch product with id ${id}`);
      })
    );
  }
}