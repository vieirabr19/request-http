import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private readonly API = `${environment.API}cursos`;

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(1000)
        // tap(console.log)
      )
  }

  listById(id: number){
   return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  create(curso: Curso): Observable<Curso>{
    return this.http.post<Curso>(this.API, curso).pipe(take(1));
  }

  update(curso: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: Curso): Observable<Curso>{
    if(curso.id){
      return this.update(curso);
    }
    return this.create(curso);
  }
}
