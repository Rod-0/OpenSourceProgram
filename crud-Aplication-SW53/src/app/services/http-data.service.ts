import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Observable,catchError,retry,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
base_URL = 'http://localhost:3000';


  constructor(private http:HttpClient) {}
    httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
   }
    handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error(`an error occurred: ${error.error.message}`);
  }else{
    console.error(`an error occurred: ${error.error.message}`);
  }
  return throwError('something went wrong');
  };
  getList():Observable<Student>{
    return this.http.get<Student>(this.base_URL + '/students')
    .pipe(retry(2),catchError(this.handleError));
  }

  getItem(id:string):Observable<Student>{
    return this.http.get<Student>(this.base_URL + '/students/' + id)
    .pipe(retry(2),catchError(this.handleError));
  }

  updateItem(id:string,item:any):Observable<Student>{
    return this.http.put<Student>(this.base_URL + '/students/' + id,JSON.stringify(item),this.httpOptions)
    .pipe(retry(2),catchError(this.handleError));
  }
  createItem(item:any):Observable<Student>{
    return this.http.post<Student>(this.base_URL + '/students/',JSON.stringify(item),this.httpOptions)
    .pipe(retry(2),catchError(this.handleError));
  }

  deleteItem(id:string):Observable<Student>{
    return this.http.delete<Student>(this.base_URL + '/students/' + id,this.httpOptions)
    .pipe(retry(2),catchError(this.handleError));
  }
}
