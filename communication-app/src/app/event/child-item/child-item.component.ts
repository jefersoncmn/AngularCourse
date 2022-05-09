import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.css']
})
export class ChildItemComponent implements OnInit {

  @Input() title: string; //Permite entrada de dados pelo componente pai
  @Output() inc = new EventEmitter<number>(); //Eventos, permite mandar dados desse componente para o componente pai.

  constructor() { }

  ngOnInit() {
  }

  //Será chamado nos clicks do componente. Ele ira emitir os eventos, enviando os dados "n".
  btnClick(n) {
    this.inc.emit(n);
  }

}
