import { Component, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, Subscription, Subject, timer } from 'rxjs';
import { map, delay, filter, tap, take, first, last, debounceTime, takeWhile, takeUntil } from 'rxjs/operators';
import { MatRipple } from '@angular/material';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  @ViewChild(MatRipple) ripple: MatRipple;
  private searchInput: string = '';

  constructor() { }

  ngOnInit() {
  }

  mapClick() {
    from([1,2,3,4,5,6,7]) //Observador que envia esses dados em sequência (como um stream)
    .pipe(//Cada item passado poderá ser alterado
      map(i=>i*2), //Altera o dado do fluxo
      map(i=>i*10),
      delay(2000)
    )
    .subscribe(i=>console.log(i));

    fromEvent(document, 'click')
      .pipe(
        map((e: MouseEvent) => ({x: e.screenX, y: e.screenY}))//Só retorna os dados pedidos
      )
      .subscribe((pos) => console.log(pos)); //Sempre precisa fazer o subscribe
  }

  //Filter = Faz a filtragem do dado de saída
  filterClick() {
    from([1,2,3,4,5,6,7])
    .pipe(
      filter(i=>i%2==1)
    )
    .subscribe(i=>console.log(i));
    
    interval(1000)
      .pipe(
        filter(i => i%2==0),
        map(i=>"Value: " + i),
        delay(1000))
      .subscribe(i=>console.log(i));
  }

  tapClick() {
    interval(1000)
      .pipe(
        tap(i => console.log('')),
        tap(i => console.warn('Before filtering: ', i)),
        filter(i => i%2==0),
        tap(i => console.warn('After filtering: ', i)),
        map(i=>"Value: " + i),
        tap(i => console.warn('After map: ', i)),
        delay(1000))
      .subscribe(i=>console.log(i));    
  }

  takeClick() {
    const observable = new Observable((observer) => {
      let i;
      for(i=0;i<20;i++)
        setTimeout(()=>observer.next(Math.floor(Math.random()*100)), i*100);
      //setTimeout(()=>observer.complete(), i*100);
    });

    const s: Subscription = observable
      .pipe(
        tap(i=>console.log(i)),
        //take(10)
        first()
        //last()
      )
      .subscribe(
        v=>console.log('Output: ',v),
        (error) => console.error(error),
        () => console.log('Compĺete!')
      );

    const interv = setInterval(()=>{
      console.log('Checking...');
      if(s.closed) {
        console.warn('Subscription CLOSED!');
        clearInterval(interv);
      }

    },200)
  }

  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true, centered: true });
    rippleRef.fadeOut();
  }

  //Cria o evento pra dar efeito no botão
  debounceTimeClick() {
    fromEvent(document, 'click')
    .pipe(
      tap((e)=> console.log('Click')),
      debounceTime(1000)//Todos os valores entre o intervalo emitido, serão ignorados. Ou seja. ele pega o click e só depois de 1 seg ele vai gerar o dado.
    )
    .subscribe(
      (e: MouseEvent) => {
        console.log("Click with debounceTime: ", e);
        this.launchRipple();
      })
  }

  searchEntry$: Subject<string> =  new Subject<string>();
  searchBy_UsingDebounce(event) {
    this.searchEntry$.next(this.searchInput);
  }

  debounceTimeSearch() {
    this.searchEntry$
      .pipe(debounceTime(500)) //Ignorará entrada de dados a cada meio segundo
      .subscribe((s)=> console.log(s)) //Depois dará o print com oq tiver
  }

  takeWhileClick() {
    interval(500)
    .pipe( takeWhile((value,index) => (value<5)) )//Pega o retorno do observer, enquanto for menor que 5. Se for maior ele dará complete.
    .subscribe(
      (i) => console.log('takeWhile: ', i),
      (error) => console.error(error),
      () => console.log('Completed!'));
  }

  takeUntilSearch() {

    let duetime$ = timer(5000);

    interval(500)
    .pipe( takeUntil(duetime$) )//Ele vai pegar o retorno do observer, até o momento que o observer do "duetime" mandar o primeiro retorno, aí ele irá parar. 
    .subscribe(
      (i) => console.log('takeWhile: ', i),
      (error) => console.error(error),
      () => console.log('Completed!'));
  }


}

