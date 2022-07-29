import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
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
        delay(3000),
        tap(console.log)
      )
  }
}
