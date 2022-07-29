import { Curso } from './../curso';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[] = [];
  cursos$: Observable<Curso[]> = this.cursosService.list();

  constructor(
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {
    // this.cursosService.list().subscribe(dada => this.cursos = dada);
  }

}
