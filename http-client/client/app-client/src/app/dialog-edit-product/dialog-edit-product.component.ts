import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-edit-product',
  templateUrl: './dialog-edit-product.component.html',
  styleUrls: ['./dialog-edit-product.component.css']
})
export class DialogEditProductComponent implements OnInit {

  product: Product = {_id: '', name: '', department: '', price: 0};

  constructor(
    public dialogRef: MatDialogRef<DialogEditProductComponent>,//Referenciar essa classe
    @Inject(MAT_DIALOG_DATA) public p: Product) //Isso é pra usar a Dialog, aí ele vai usar o Product, pra preencher os dados dele 
  { 
    this.product = p;
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();//Fecha o Dialog
  }

}
