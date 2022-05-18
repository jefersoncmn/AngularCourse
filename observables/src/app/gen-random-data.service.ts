import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, Observer } from 'rxjs';
import { DataModel } from './datamodel';
import { publish } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenRandomDataService {
  public dataObservable: ConnectableObservable<DataModel>;

  constructor() { 
    //Gera o novo observável
    this.dataObservable = new Observable(
      (observer: Observer<DataModel>) => {
        let n = 0;
        console.log("Observable created");
        let f = () => {
          n++;
          console.log(n);
          if (n<=10) {
            let timestamp = Math.round(Math.random()*2000 + 500);
            observer.next({timestamp: timestamp, data: n});
            setTimeout(f, timestamp);//Chamará a função f depois do intervalo do timestamp
          }
          else
            observer.complete();
        }
        f();//O observável irá rodar a função criada
      }
    ).pipe(publish()) as ConnectableObservable<DataModel>;
  }
}
