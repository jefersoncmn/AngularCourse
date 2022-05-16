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
    const hello = Observable.create((observer: Observer<string>) => {
      observer.next('Hello');
      observer.next('from');
      observer.next('observable!');
      observer.complete();
    });
    hello.subscribe(val=> console.log(val));
  }

  fromClick() {
    from([1,2,3,4,5,{x:10,y:20}])
      .subscribe((v) => console.log(v));
    const source = from([1,2,3,4,5,{x:10,y:20}]);
    source.subscribe((v) => console.error(v));
    source.subscribe((v) => console.warn(v));
  }

  ofClick() {
    of([1,2,3,4,5,{x:10,y:20}])
      .subscribe((v) => console.log(v));
  }

  intervalClick() {
    const source = interval(1000);
    const subscription = source.subscribe((v) => console.log(v));
    this.subscription.add(subscription);
  }

  timerClick() {
    //const source = timer(1000);
    const source = timer(3000,1000);
    const subscription = source.subscribe((v) => console.log(v));
    this.subscription.add(subscription);
  }

  fromEventClick() {
    const subscription = fromEvent(document,'click')
      .subscribe((e)=>console.log(e));
    this.subscription.add(subscription);      
  }

  unsubscribeClick() {
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
  }
}
