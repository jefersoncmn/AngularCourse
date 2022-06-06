import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Observer, Observable } from 'rxjs';
import { Product } from './product.model';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';
import { filter, switchAll, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  simpleReqProductsObs$: Observable<Product[]>;
  productsErrorHandling: Product[];
  productsLoading: Product[];  
  bLoading : boolean = false;
  productsIds: Product[];  
  newlyProducts : Product[] = [];
  productsToDelete: Product[];
  productsToEdit: Product[];

  constructor(
    private productsService: ProductsService, //Inserção de dependência do service
    private snackBar: MatSnackBar, //SnackBar pra mostrar o erro (balãozinho de erro)
    private dialog: MatDialog) {} //Pra usar o Dialog. A janelinha pra editar
  
  ngOnInit() {
  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ = this.productsService.getProducts();
  }

  getProductsWithErrorHandling() {
    this.productsService.getProductsError()
      .subscribe(
        (prods) => { this.productsErrorHandling = prods; }, //Deu bom
        (err) => {  //Tratando com os erros
          console.log(err);
          console.log("Message: " + err.error.msg);
          console.log("Status code: " + err.status);
          let config = new MatSnackBarConfig();// Cria o SnackBar para mostrar os erros (balãozinho de mensagem)
          config.duration = 2000;//Define a duração dele
          config.panelClass = ['snack_err'];//Define o nome dele no Css, pra poder mudar o estilo

          if (err.status == 0) //Erro 0 é quando não consegue se comunicar com o servidor. 500 consegue.
            this.snackBar.open('Could not connect to the server', '', config);//Tem que escrever a mensagem pq o não receberá a mensagem de erro do server, pq não conecta
          else
            this.snackBar.open(err.error.msg, '', config);
        }
      )
  }

  getProductsWithErrorHandlingOK(){
    this.productsService.getProductsDelay()
      .subscribe(
        (prods) => { 
          this.productsErrorHandling = prods; 
          let config = new MatSnackBarConfig();
          config.duration = 2000;
          config.panelClass = ['snack_ok'];
          this.snackBar.open('Products successfully loaded!', '', config);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  getProductsLoading() {
    this.bLoading = true;//Define o componente que exibe o carregamento para ficar rodando
    this.productsService.getProductsDelay()
      .subscribe(
        (prods) => { 
          this.productsLoading = prods; 
          this.bLoading = false;
        },
        (err) => {
          console.log(err);
          this.bLoading = false;
        }
      )    
  }

  getProductsIds() {

    this.productsService.getProductsIds()
      .subscribe((ids) => {
        this.productsIds = ids.map(id => ({_id: id, name: '', department: '', price: 0}));//Mapeia cada id retornado e retorna um produto
      })
  }

  loadName(id: string) {
    this.productsService.getProductName(id)
      .subscribe( (name => {
        let index = this.productsIds.findIndex(p=>p._id===id);
        if (index >= 0) {
          this.productsIds[index].name = name;
        }
      }));
  }

  saveProduct(name: string, department: string, price: number) {
    let p = {name, department, price};
    this.productsService.saveProduct(p)//Ele vai mandar o produto pro servidor, para salvar
      .subscribe(
        (p: Product) => { //Caso dê bom ele retornará o produto com ID
          console.log(p);
          this.newlyProducts.push(p);
        },
        (err) => {
          console.log(err);
          let config = new MatSnackBarConfig();
          config.duration = 2000;
          config.panelClass = ['snack_err'];
          if (err.status == 0)
            this.snackBar.open('Could not connect to the server', '', config);
          else
            this.snackBar.open(err.error.msg, '', config);          
        }
      );
  }

  loadProductsToDelete() {
    this.productsService.getProducts()
      .subscribe((prods) => this.productsToDelete = prods);
  }

  deleteProduct(p: Product) {
    this.productsService.deleteProduct(p)
      .subscribe(
        (res) => {
          let i = this.productsToDelete.findIndex(prod=>p._id== prod._id);//Procura o produto que apagou
          if (i>=0)//Se encontrou o produto apagado
            this.productsToDelete.splice(i, 1); //Delete o produto que deletou da lista
        },
        (err) => {
          console.log(err);
        }

      );
  }

  loadProductsToEdit() {
    this.productsService.getProducts()
      .subscribe((prods) => this.productsToEdit = prods);
  }

  editProduct(p: Product) {
    let newProduct: Product = {...p};//Cria uma nova referência do 'p'. Pra não mudar os dados dele
    let dialogRef = this.dialog.open(DialogEditProductComponent, {width: '400px', data: newProduct});//Abre o Dialog, chamando o Componente que ele irá mandar o dados, tamanho e os dados que irão preencher esse componentes.

    dialogRef.afterClosed() //Depois que fechou o Dialog, vai rodar o subscribe que vai rodar a função do service
      .subscribe((res: Product)=> {
        //console.log(res);
        if (res) {
          this.productsService.editProduct(res) 
            .subscribe(
              (resp) => {
                let i = this.productsToEdit.findIndex(prod=>p._id== prod._id); //Procura o produto editado na lista
                if (i>=0)
                  this.productsToEdit[i] = resp;//Altera ele de acordo com o retorno de servidor
              },
              (err) => console.error(err)
            )
        }
      });

/*  // Resolucao do exercicio 1)

    dialogRef.afterClosed()
      .pipe(
        filter( (prod: Product)=> prod!=undefined),
        switchMap((prod: Product) => this.productsService.editProduct(prod)))
      .subscribe(
        (prod: Product,) => {
          let i = this.productsToEdit.findIndex(p=>p._id== prod._id); 
          if (i>=0)
            this.productsToEdit[i] = prod;
        },
        (err) => console.error(err)
      )

    // Resolucao do Exercicio 2: Utilize Subject 
*/      
  }

}
