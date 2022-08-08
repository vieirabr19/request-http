import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { CursosService } from '../cursos.service';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../curso';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   tap(console.log),
    //   switchMap(id => this.cursosService.listById(id))
    // )
    // .subscribe(curso => this.updateForm(curso));

    // concatMap -> ordem da requisição importa
    // margeMap -> ordem não importa
    // exhaustMap -> casos de login

    const curso = this.route.snapshot.data['curso'];
    console.log('CURSO',curso);

    this.form = this.fb.group({
      id: [curso[0].id],
      nome: [curso[0].nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  onSumit(){
    this.submitted = true;
    if(this.form.valid){
      console.log('FORM',this.form.value)
      this.cursosService.create(this.form.value).subscribe({
        next: () => {
          this.alertModalService.showAlertSuccess('Curso criado com sucesso!');
          this.location.back();
        },
        error: () => this.alertModalService.showAlertDanger('Erro ao criar curso, tente novamente.'),
        complete: () => console.log('Completou')
      })
    }
  }

  // updateForm(curso: Curso){
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  onCancel(){
    this.submitted = false;
    this.form.reset();
  }

  hasError(field: string){
    return this.form.get(field)?.errors;
  }

}
