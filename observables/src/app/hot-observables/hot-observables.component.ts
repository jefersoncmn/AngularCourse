import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject, ConnectableObservable } from 'rxjs';

import { publish, refCount, share } from 'rxjs/operators';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {
  n: number = 0;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  myObservable: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.myObservable = new Observable(
      (observer:Observer<number>) => {
        let i : number = 0;
        console.log('%c Observable Created', 'background: #cccccc; color: #ff0000');
        setInterval(()=>{
          i++;
          console.log('%c i = ' + i, 'background: #cccccc; color: #0000FF');
          (i==100) ? observer.complete() : observer.next(i);
        }, 1000)
      }
    );
    //this.usingSubjects();
    //this.usingPublish();
    this.usingShare();
  }


  usingShare() {
    //Nesse caso o myObservable só começará a partir do primeiro subscribe feito
    //Nesse caso, se o myObservable dar complete, ao criar um novo subscribe, será possivel reiniciar o myObservable
    const multicasted = this.myObservable.pipe(share());//É a mesma coisas do 

    //Subscriber 1
    this.s1 = 'waiting for interval...';
    setTimeout(()=>{
      multicasted.subscribe((_n) => { 
        this.n1 = _n;
        this.s1 = 'OK';
      })
    },2000);

    //Subscriber 2
    this.s2 = 'waiting for interval...';
    setTimeout(()=>{
      multicasted.subscribe((_n) => { 
        this.n2 = _n;
        this.s2 = 'OK';
      })
    },4000);    
  }  


  usingPublish() {
    //Pipe aplica tratamento nos dados que tão entrando
    //Nesse caso o myObservable só começará a partir do primeiro subscribe feito
    //Nesse caso com o "refCount()" O multicasted irá criar um subject e ira ligar com o myObservable, porém nesse caso ele funciona normal, mas quando o observable dar complete, se chamar novamente não ira criar um novo observable que recomeçara a emitir os dados. Diferente do Share.
    //const multicasted = this.myObservable.pipe(publish(), refCount());

    //Nesse segmento é criado um ConnectableObservable que ira se increver no myObservable
    const multicasted: ConnectableObservable<number> = this.myObservable
      .pipe(publish()) as ConnectableObservable<number>;
    multicasted.connect();//Nesse momento que e o myObservable começará a emitir os dados. Assim poderá ter o controle de quando começaremos a ouvir as informações.

    //Subscriber 1
    this.s1 = 'waiting for interval...';
    setTimeout(()=>{
      multicasted.subscribe((_n) => { 
        this.n1 = _n;
        this.s1 = 'OK';
      })
    },2000);

    //Subscriber 2
    this.s2 = 'waiting for interval...';
    setTimeout(()=>{
      multicasted.subscribe((_n) => { 
        this.n2 = _n;
        this.s2 = 'OK';
      })
    },4000);    
  }

  //Nesse segmento é feito um subject que vira um observable de um observable, criando anteriormente.
  //Ele permite criar vários Subscribers observando esse primeir observable, sem recria-lo
  usingSubjects() {
    const subject = new Subject<number>();
    this.myObservable.subscribe(subject);//O myObservable é criado nesse momento. A partir desse ponto o Subject poderá ter vários subscribes que irão observar esse mesmo myObservable. Isso permite várias coisas olharem a mesma instância, com ela já tendo sido criada em outro momento.

    //Subscriber 1
    this.s1 = 'waiting for interval...';
    setTimeout(()=>{
      subject.subscribe((_n) => { 
        this.n1 = _n;
        this.s1 = 'OK';
      })
    },2000);

    //Subscriber 2
    this.s2 = 'waiting for interval...';
    setTimeout(()=>{
      subject.subscribe((_n) => { 
        this.n2 = _n;
        this.s2 = 'OK';
      })
    },4000);

  }



}
