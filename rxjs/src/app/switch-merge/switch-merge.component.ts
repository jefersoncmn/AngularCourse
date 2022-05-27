import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { Person } from './person.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeAll, mergeMap, switchAll, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {
  @ViewChild('searchBy') el: ElementRef; //Pega a referência do InputField
  searchInput: string = '';
  people$: Observable<Person[]>;
  constructor(private http: HttpClient) { }

  private readonly url: string = 'http://localhost:9000';

  ngOnInit() {
    //this.firstOption();
    //this.secondOption();
    this.thirdOption();//Faz requisições anteriores canceladas. Pois o usuário já fez outra requisição.
  }

  filterPeople(searchInput: string): Observable<Person[]> {
    if(searchInput.length===0)
      return of([]);
    return this.http.get<Person[]>(`${this.url}/${searchInput}`);
  }

  thirdOption() {
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup'); 
    /*
    this.people$ = keyup$
      .pipe(map( (e) => this.filterPeople(this.searchInput)))
      .pipe(switchAll());
    */
   this.people$ = keyup$
    .pipe(
      debounceTime(700),//Intevalo de digitaçào, pra não ficar mandando request pro sevidor
      switchMap(()=>this.filterPeople(this.searchInput))) //faz o mesmo que o 'mergeMap()', com a diferença que, no processo do pipe que vai passando Observer por ele, ele vai dar subscribe em um Observer que passou pelo pipe, se vier um novo, é trocado.

  }

  secondOption() {
    let keyup$ = fromEvent(this.el.nativeElement, 'keyup'); 

    /*
    let fetch$ = keyup$.pipe(map( (e) => this.filterPeople(this.searchInput))) ;
    fetch$
      .pipe(mergeAll()) //O 'mergeAll()' faz um subscribe interno para que a função 'filterPeople' possa retornar os dados. Esse subcribe será possível obter o array com as pessoas a serem buscadas.
      .subscribe((data) => console.log(data));
    this.people$ = fetch$.pipe(mergeAll());
    */

   this.people$ = keyup$.pipe(mergeMap( (e) => this.filterPeople(this.searchInput)));//o 'mergeMap()' já faz o subscribe no Observer de retorno do 'filterPeople' e já retorna os dados.
   
  }

  firstOption() {
    fromEvent(this.el.nativeElement, 'keyup') //cria o Observer com base nos eventos do elemento do Inputfield
      .subscribe(e=>{
        this.filterPeople(this.searchInput)
          .subscribe(r=>console.log(r))
      });
  }

}
