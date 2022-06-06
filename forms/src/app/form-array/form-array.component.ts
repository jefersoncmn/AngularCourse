import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: ['']
    }),
    phones: this.fb.array(['']), //Array permite vários campos
    children: this.fb.array([])
    

  })
  phones = this.clientForm.get('phones') as FormArray;
  children = this.clientForm.get('children') as FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  submit() {
    console.log(this.clientForm.value);
  }

  addPhone() { 
    this.phones.push(this.fb.control('')) //Adicionará inputs. O "fb.control" é o próprio input.
  }

  addChild() { //Adiciona um grupo inteiro no form
    this.children.push(
      this.fb.group({
        name: this.fb.control(''),
        age: this.fb.control('')
      })      
    )
  }
}
