import { Component, OnInit } from '@angular/core';
import { Observable, Observer, from, of, interval, timer, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.css']
})
export class BasicCreationComponent implements OnInit {

  subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
  }

  observableCreate() {
    //Cria o observable
    const hello = Observable.create((observer: Observer<string>) => {
      observer.next('Hello');
      observer.next('from');
      observer.next('observable!');
      observer.complete();
    });
    hello.subscribe(val=> console.log(val));//Faz o subscribe que vai printar os dados mandados pelo Observable
  }

  fromClick() {
    from([1,2,3,4,5,{x:10,y:20}])//O from é capaz de enviar uma sequência de dados (em sequência)(como um observable)
      .subscribe((v) => console.log(v)); //E já realizado operações com esse envio
    const source = from([1,2,3,4,5,{x:10,y:20}]);
    source.subscribe((v) => console.error(v));
    source.subscribe((v) => console.warn(v));
  }

  ofClick() {
    of([1,2,3,4,5,{x:10,y:20}]) //Faz a mesma coisa que o from, porém ele irá enviar tudo em um next só (ou seja, enviar a sequência de dados toda de uma vez)
      .subscribe((v) => console.log(v));
  }

  intervalClick() {
    const source = interval(1000);//É um observable que irá realizar um next a cada 1000 milisegundos (nesse caso), é preciso encerrar ele, se não ele fica rodando na memória.
    const subscription = source.subscribe((v) => console.log(v));
    this.subscription.add(subscription);
  }

  timerClick() {
    //const source = timer(1000);//Vai contar uma vez só e parar
    const source = timer(3000,1000);//O timer irá esperar os 3 segundo e depois ir mandando next de 1 em 1 segundo
    const subscription = source.subscribe((v) => console.log(v));
    this.subscription.add(subscription);
  }


  fromEventClick() {
    const subscription = fromEvent(document,'click') //Pega o evento 'click' do document do HTML
      .subscribe((e)=>console.log(e));//Depois printa esse evento
    this.subscription.add(subscription);      
  }

  unsubscribeClick() {
    this.subscription.unsubscribe();//Encerrou os subscribers
    this.subscription = new Subscription();
  }
}
