import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  firstName = new FormControl('');
  lastName = new FormControl('');

  constructor() { }

  ngOnInit() {
    this.firstName.valueChanges 
      .subscribe((newName) => console.log(newName)); //Verifica mudanças do input
  }

  setFirstName() {
    this.firstName.setValue('Adam'); //Setar valor no input
    console.log(this.firstName.value);
  }

}
