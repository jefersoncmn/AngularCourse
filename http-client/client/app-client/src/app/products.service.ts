import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { } //Faz a injeção de dependencia do HttpClient

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`); //'get<Product[]>' já define oq terá de retorno da request
  }

  getProductsError(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productserr`);
  }

  getProductsDelay(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productsdelay`);
  }

  getProductsIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/products_ids`);
  }

  getProductName(id:string) : Observable<string> {
    return this.http.get(`${this.url}/products/name/${id}`,
      {responseType: "text"});//Define que será retornado text. Se não mudar ele reconhece como JSON.
  }

  saveProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/products`, p); //Vai mandar para o servidor o produto P
  }

  deleteProduct(p: Product) {
    return this.http.delete(`${this.url}/products/${p._id}`)
  }

  editProduct(p: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.url}/products/${p._id}`, p);
  }
}
