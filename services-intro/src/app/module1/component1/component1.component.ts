import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service1.service';
import { Service2 } from 'src/app/service2.service';
@Component({
  selector: 'app-component1',
  //providers: [ Service1 ],
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {

  num = 0;
  text = "";
  
  //Entrada com a injeção de dependências, aqui entra os serviços
  constructor(
    private myService1: Service1, //Declarando o atributo direto no parâmetro
    private myService2: Service2) { }

  ngOnInit() {
    this.num = this.myService1.num;//Pega informações do Service
    this.text = this.myService2.text;
  }

}
