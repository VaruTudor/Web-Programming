import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../add/book";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  _url = 'Assignment8/Backend/update_book.php';

  constructor(private _http: HttpClient) { }
  updateRequest(book: Book): Observable<any>{
    return this._http.post(this._url, book);
  }
}
