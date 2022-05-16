import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';
import { BrowserViewportScroller } from '@angular/common/src/viewport_scroller';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  subscription1: Subscription;//Receberá respostas do subscribe
  subscription2: Subscription;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
    this.s1 = 'Initializing...';
    this.s2 = 'Initializing...';

    //O Observable é a classe que irá gerar o dados que serão observados por outras classes.
    const myFirstObservable = new Observable(
      (observer: Observer<number>) => {
        observer.next(1);//Irá gerar o dado
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.error("error");//Permite fazer o envio de erros, pra depois poder ser tratado por quem recebe os dados.
        observer.complete();
      }
    );
    //É feito o subscribe do observer, para poder receber os dados gerados por ele.
    myFirstObservable.subscribe(
      (n: number) => console.log(n), //Nesse caso o observer retorna number
      (error) => console.error(error),  //Também é tratado os casos de erro
      () => console.log('completed.'));
    
    /* 
    const timerCount = interval(500); //Funciona como um observer, também
    timerCount.subscribe(
      (n) => console.log(n)
    )
    console.log("after interval");
    */

    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {
        let i:number = 0;
        let id = setInterval(()=>{
          i++;
          console.log('from Observable: ', i);
          if (i == 10)
            observer.complete();
          else if(i%2 == 0)
            observer.next(i);
        }, 1000);
        return () => { //Esse é o return do observer, quando ele der o 'complete' ele realizará essa função
          clearInterval(id); //Parar o setInterval
        }
      }
    );

    //Nesses dois exemplos abaixo é feito o recebimento de dados dos subscribes para as variáveis do componente
    this.subscription1 = myIntervalObservable.subscribe(
      (_n) => {this.n1 = _n},
      (error) => {this.s1 = 'Error: ' + error },
      () => {this.s1 = 'Completed'}
    );
    this.subscription2 = myIntervalObservable.subscribe(
      (_n) => {this.n2 = _n},
      (error) => {this.s2 = 'Error: ' + error },
      () => {this.s2 = 'Completed'}
    );

    //Importante dar unsubscribe, para não deixar na memória
    setTimeout(()=>{
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 15000)

  }

}
