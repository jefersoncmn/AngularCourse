import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-name-changes',
  templateUrl: './name-changes.component.html',
  styleUrls: ['./name-changes.component.css']
})
export class NameChangesComponent implements OnInit, OnChanges {

  @Input() name: string;
  nameBefore: string;

  constructor() { }

  ngOnInit() {
  }

  //Identifica a mudança nas variáveis do componente atual (como um listener).
  ngOnChanges(changes: {[propKey: string]: SimpleChange}){//Por meio do changes dá pra obter os dados de mudança
    // console.log(changes);
    if(changes.hasOwnProperty('name')) { //Se acontecer uma mudanda na variável 'name'
      this.nameBefore = changes['name'].previousValue; //o nameBefore receberá o dado anterior que estava na variável 'name'
    }
  }
}
