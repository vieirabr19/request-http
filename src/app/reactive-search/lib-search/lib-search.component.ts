import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { filter, map, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {
  readonly URL_API = 'https://api.cdnjs.com/libraries';
  queryField = new FormControl();
  result$: Observable<any>;
  total = 0;
  readonly FIELDS = 'filename,description,version,github';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.result$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this.http.get(this.URL_API, {
          params: {
            search: value,
            fields: this.FIELDS
          }
        })),
        // tap(console.log),
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results),
        // tap(console.log),
      );
  }

  search(){
    let value = this.queryField.value;
    let fields = 'filename,description,version,github';
    if(value && (value = value.trim()) !== ''){
      // let params = {
      //   search: value,
      //   fields: fields
      // }

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);

      this.result$ = this.http.get(this.URL_API, {params})
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        )
    }
  }

}
