import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-changes',
  templateUrl: './on-changes.component.html',
  styleUrls: ['./on-changes.component.css']
})
export class OnChangesComponent implements OnInit {

  name = "";
  newName = "";

  constructor() { }

  updateName() {
    this.newName = this.name;
  }

  ngOnInit() {
  }

}
