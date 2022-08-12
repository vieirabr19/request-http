import { delay, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CrudService<T> {
  constructor(
    protected http: HttpClient,
    private API_URL: string
  ){}

  list(){
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(500)
        // tap(console.log)
      )
  }

  listById(id: number){
   return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  create(record: T): Observable<T>{
    return this.http.post<T>(this.API_URL, record).pipe(take(1));
  }

  update(record: T): Observable<T>{
    return this.http.put<T>(`${this.API_URL}/${record['id' as keyof T]}`, record).pipe(take(1));
  }

  save(record: T): Observable<T>{
    if(record['id' as keyof T]){
      return this.update(record);
    }
    return this.create(record);
  }

  delete(id: number){
    return this.http.delete<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
