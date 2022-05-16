import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  @ViewChild(MatTable) datatable: MatTable<any>;//Referencia do datatable

  products: Product[];

  prodColumns: string[] = ["id", "prodname", "department", "price", "description"];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts(); //Pega os produtos do service
    this .productService.onNewProduct
      .subscribe((p) => {   //Se subscreve no evento do product service, para ficar ouvindo. Ele retorna o "p"
        this.datatable.renderRows();//Função a API do datatable, que ele renderiza a tabela novamente. Pra obter o item novo adicionado na tabela.
      });
  }

}
