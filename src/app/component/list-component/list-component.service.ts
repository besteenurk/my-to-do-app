import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListComponentService {

  private readonly URL = 'http://localhost:3000/list';
  constructor(private http: HttpClient) { }

  getToDoList(): Observable<any> {
    return this.http.get(this.URL);
  }

  changeTaskStatus(id: number, value: string) {
    const param = '/' + id;
    const headers =  {
      headers: new  HttpHeaders({
        'content-type': 'application/json'})
    };
    return this.http.put<any>(this.URL + param, value, headers)
  }

  deleteTask(id: number): Observable<any> {
    const param = '/' + id;
    return this.http.delete(this.URL + param);
  }
}
