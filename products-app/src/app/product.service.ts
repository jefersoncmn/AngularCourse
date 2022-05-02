import { Injectable, EventEmitter } from '@angular/core';
import { Product } from './models/product.model';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataFromServer: any[] = [
    {id: 1, name: "Laptop", department_id: 4, price: 40, description: 'Laptop Description'},
    {id: 2, name: "Shirt", department_id: 1, price: 10, description: 'Shirt Description'},
    {id: 3, name: "Polo", department_id: 1, price: 50, description: 'Polo Descriptino'},
    {id: 4, name: "Mouse", department_id: 3, price: 40, description: 'Mouse Description'},
  ];

  private products: Product[] = [];
  private nextID: number;

  onNewProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private departmentService: DepartmentService) 
  { 
    for(let p of this.dataFromServer) {
      this.products.push({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        department: this.departmentService.getDepartmentById(p.id)
      });
      this.nextID = p.id+1;
    }
  }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(p: Product) {
    let prod: Product = {id: this.nextID++, ...p};
    this.products.push(prod);
    console.log(this.products);
    this.onNewProduct.emit(prod)
  }

}
