import { Curso } from './../curso';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
// import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[] = [];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  // bsModalRef?: BsModalRef;

  constructor(
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
    // private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    // this.cursosService.list().subscribe(dada => this.cursos = dada);
    this.onReflash();
  }

  onReflash(){
    this.cursos$ = this.cursosService.list()
    .pipe(
      catchError((error) => {
        console.log(error);
        // this.error$.next(true);
        this.handleError();
        // this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
        return EMPTY;
      })
    );
  }

  onEdit(id: number){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  handleError(){
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

}
