import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {List} from "../list-component/list";
import {FormControl, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  private readonly URL = 'http://localhost:3000/list';

  constructor(private http: HttpClient) { }

  resolveItems(item: string): Observable<List> {
    const headers =  {
      headers: new  HttpHeaders({
        'content-type': 'application/json'})
    };
    return this.http.post<any>(this.URL,
      item, headers)
  }
}
