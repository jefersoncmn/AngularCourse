import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, AsyncSubject, BehaviorSubject } from 'rxjs';
import { GenRandomDataService } from '../gen-random-data.service';
import { DataModel } from '../datamodel';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  private subject: Subject<DataModel>;
  private replaySubject: ReplaySubject<DataModel>;
  private asyncSubject: AsyncSubject<DataModel>;
  private behaviorSubject: BehaviorSubject<DataModel>;

  constructor(private dataService: GenRandomDataService) { }



  ngOnInit() {
    this.subject= new Subject<DataModel>(); //Ele fará a leitura de tudo que for emitido por quem ele está observando (no caso for subscriber), a partir do momento que ele for criado. Ou seja, ele foi criado, quando o observador mandar o dado ele vai obter.
    this.replaySubject= new ReplaySubject<DataModel>(); //Ele fará a leitura de tudo que foi emitido por quem ele está observando (no caso for subscriber), se antes dele ter sido iniciado, a instância que observou mandou algum dado, ele fará a leitura desse dado do passado, e todos até o ultimo.
    this.asyncSubject= new AsyncSubject<DataModel>();//Ele fará a leitura somente do ultimo dado gerado pelo Observer (ultimo antes do complete).
    this.behaviorSubject= new BehaviorSubject<DataModel>({ timestamp: 0, data: 0});//Ele fará a leitura de tudo que for emitido por quem tá observando. Começando pelo ultimo dado emitido pelo observer.
  
    this.dataService.dataObservable.subscribe(this.subject);
    this.dataService.dataObservable.subscribe(this.replaySubject);
    this.dataService.dataObservable.subscribe(this.asyncSubject);
    this.dataService.dataObservable.subscribe(this.behaviorSubject);

  }

  connect() {
    this.dataService.dataObservable.connect();//Aqui começará a ser gerado dados do Observer
  }

}
