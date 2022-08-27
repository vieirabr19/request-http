import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

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

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  search(){
    let value = this.queryField.value;
    if(value && (value = value.trim()) !== ''){
      console.log('VALUE',value);
      this.result$ = this.http.get(`${this.URL_API}?search=${value}&fields=filename,description,version,github`)
        .pipe(
          tap(console.log),
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        )
    }
  }

}
