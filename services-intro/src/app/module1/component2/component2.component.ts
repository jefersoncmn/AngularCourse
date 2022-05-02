import { Component, OnInit } from '@angular/core';
import { Service1 } from '../service1.service';
import { Service2 } from 'src/app/service2.service';

@Component({
  selector: 'app-component2',
  // providers: [ Service1 ],
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component implements OnInit {

  num = 0;
  text = ""; 
  constructor(
    private myService1: Service1,
    private myService2: Service2) { }

  ngOnInit() {
    this.num = this.myService1.num;
    this.text = this.myService2.text;
  }


}
