import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Department } from './department';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = 'http://localhost:3000/departments';

  private departmentsSubject$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);//Será usado para armazenar os dados do departamento, unificando tudo aqui, se por meio de algum componente ocorrer uma mudança nele, isso será refletido em todos os lugares, a apartir daqui.
  private loaded: boolean = false;//Se o departmentsSubject$ ja foi carregado

  constructor(private http: HttpClient) { }

  get(): Observable<Department[]> {
    if (!this.loaded) {
      this.http.get<Department[]>(this.url)
        .pipe( 
          tap((deps) => console.log(deps)),
          delay(1000)
        )
        .subscribe(this.departmentsSubject$); //O departmentsSubject$ vai ficar observando os dados do get
      this.loaded = true;
    }
    return this.departmentsSubject$.asObservable();//Retorna um observable do Subject, pra poder ter seu uso em ver os dados rolando.
  }

  add(d: Department): Observable<Department>  {
    return this.http.post<Department>(this.url, d)
    .pipe(
      tap((dep: Department) => this.departmentsSubject$.getValue().push(dep)) //Se adição do departamento der bom, será retornado do servidor os dados desse departamento adicionado, assim será modificado o departmentsSubject$, adicionado esse novo valor
    )
  }

  del(dep: Department): Observable<any> {
    return this.http.delete(`${this.url}/${dep._id}`)
      .pipe( 
        tap(()=> { //Se chegou no dep, é pq não teve erros no retorno
          let departments = this.departmentsSubject$.getValue();
          let i = departments.findIndex(d => d._id === dep._id);
          if (i>=0)
            departments.splice(i,1);
        }
      ))
  }

  update(dep: Department): Observable<Department> {
    return this.http.patch<Department>(`${this.url}/${dep._id}`, dep)
      .pipe(
        tap((d) => {
          let departments = this.departmentsSubject$.getValue();
          let i = departments.findIndex(d => d._id === dep._id);
          if (i>=0)
            departments[i].name = d.name;
        })
      )
  }
}
