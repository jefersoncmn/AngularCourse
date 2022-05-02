import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.css']
})
export class ChildItemComponent implements OnInit {

  @Input() title: string;
  @Output() inc = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  btnClick(n) {
    this.inc.emit(n);
  }

}
