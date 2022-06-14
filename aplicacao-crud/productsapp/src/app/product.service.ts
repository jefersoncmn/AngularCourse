import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Product } from './product';
import { DepartmentService } from './department.service';
import { map, tap, filter } from 'rxjs/operators';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/products';
  private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);//Fonte unica dos dados
  private loaded: boolean = false;

  constructor(
    private http: HttpClient,
    private deparmentService: DepartmentService) {     }

  get(): Observable<Product[]> {
    if (!this.loaded) {
      combineLatest( //Combina dois observers, assim conseguindo trabalhar com o retorno dos dois ao mesmo tempo
        this.http.get<Product[]>(this.url),//Retornará o produto
        this.deparmentService.get())//Retornará o array de departamentos
      .pipe(
        tap(([products,departments]) => console.log(products, departments)),
        filter(([products,departments])=> products!=null && departments!=null), //Vai filtrar
        map(([products,departments])=> {
          for(let p of products) { //cada produto percorrido
            let ids = (p.departments as string[]); //pega os ids dos departamento do produto
            p.departments = ids.map((id)=>departments.find(dep=>dep._id==id));//Vai pegar o departamento do produto pelo ID que contém no produto. Já que no banco ele quarda a referência do DEpartamento pelo ID
          }
          return products;
        }),
        tap((products) => console.log(products))
      )
      .subscribe(this.productsSubject$);

      this.loaded = true;
    }
    return this.productsSubject$.asObservable();
  }

  add(prod: Product): Observable<Product> {
    let departments = (prod.departments as Department[]).map(d=>d._id);//Mapeia os departamentos para só ter os Ids
    return this.http.post<Product>(this.url, {...prod, departments}) 
      .pipe(
        tap((p) => {
          this.productsSubject$.getValue() //Vai pegar os dados do array de produtos
            .push({...prod, _id: p._id}) //vai adicionar o produto, e também inserir o id
        })
      )
  }

  del(prod: Product): Observable<any> {
    return this.http.delete(`${this.url}/${prod._id}`)
      .pipe(
        tap(() => {
          let products = this.productsSubject$.getValue();
          let i = products.findIndex(p => p._id === prod._id); //Procura o produto que foi retornado, no caso deletado
          if (i>=0)
            products.splice(i, 1);//Retira da lista de produtos
        })
      )
  }

  update(prod: Product): Observable<Product> {
    let departments = (prod.departments as Department[]).map(d=>d._id);
    return this.http.patch<Product>(`${this.url}/${prod._id}`, {...prod, departments})
    .pipe(
      tap(() => {
        let products = this.productsSubject$.getValue();
        let i = products.findIndex(p => p._id === prod._id);
        if (i>=0)
          products[i] = prod;
      })
    )      
  }

}
