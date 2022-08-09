import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { Curso } from './curso';
import { CursosService } from './cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursosResolver implements Resolve<Curso> {
  constructor(
    private cursosService: CursosService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if(route.params && route.params['id']){
      return this.cursosService.list()
      .pipe(
        map(cursos => cursos.filter(curso => curso.id == route.params['id']))
      );
      // return this.cursosService.listById(route.params['id']);
    }

    return of([{
      id: null,
      nome: null
    }]);
  }
}
