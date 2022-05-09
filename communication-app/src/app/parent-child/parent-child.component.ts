import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-parent-child',
  templateUrl: './parent-child.component.html',
  styleUrls: ['./parent-child.component.css']
})
export class ParentChildComponent implements OnInit {

  @ViewChild(TimerComponent)//Vai injetar o primeiro TimerComponent que aparecer dentro do html desse componente para variável abaixo.
  private mytimer: TimerComponent;//Agora com o componente linkado a essa variável (do tipo do componente), é possivel chamar as funções do componente

  @ViewChild("myP") //Vai pegar o componente com a variável Template de nome "myP", e injetar na variável abaixo;
  private myp: ElementRef;//ElementRef é pra poder linkar com variáves padrões do html (exemplo:h1, p)

  constructor() { }

  ngOnInit() {
  }

  start(){
    this.mytimer.start();
  }
  stop() {
    this.mytimer.stop();
  }
  clear() {
    this.mytimer.clear();
  }

  //Depois que os componentes filhos são criados, é possivel realizar o acesso de dados dentro deles.
  ngAfterViewInit() {
    console.log(this.myp);
  }

}
