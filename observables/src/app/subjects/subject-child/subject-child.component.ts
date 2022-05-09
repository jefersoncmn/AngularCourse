import { Component, OnInit, Input } from '@angular/core';
import { DataModel } from 'src/app/datamodel';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.css']
})
export class SubjectChildComponent implements OnInit {

  @Input() subject: Subject<DataModel>;
  @Input() name: string;

  private log: string[] = [];
  private connected: boolean = false;
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

  logData(data: DataModel) {
    this.log.push("Timestamp: " + data.timestamp + " Data: " + data.data);
  }

  connect() {
    this.log.push("Connected!");
    this.connected = true;
    this.subscription = this.subject.subscribe(
      (data: DataModel) => {this.logData(data);},
      (error) => { this.connected = false;},
      () => { this.connected =false; this.log.push("Finished!")}
    );
  }

  disconnect() {

  }

}
