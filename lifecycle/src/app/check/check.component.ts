import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  @Input() test : string;

  private name: string = "";
  private age: number = 0;

  //Não tem acesso aos inputs
  constructor() { 
    console.log("constructor");

  }

  //Iniciado após a criação (tem acesso aos Input do componente)
  ngOnInit() {
    console.log("ngOnInit");
  }

  ngOnChanges() {
    console.log("ngOnChanges");
  }

  //Chamado após mudança no componente, por interação com usuário ou carregamentos.
  ngDoCheck() {
    console.log("ngDoCheck");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }

  //Chamado após ter alteração do HTML de entrada, por meio de NgContent.
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
  }

  //Chamado após checkar os objetos filhos.
  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
  }
}
