import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "./book";

@Injectable({
  providedIn: 'root'
})
export class AddService {

  _url = 'Assignment8/Backend/add_book.php';

  constructor(private _http: HttpClient) { }

  addRequest(book: Book): Observable<any>{
    return this._http.post<any>(this._url, book);
  }
}
