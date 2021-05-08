import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  _url = 'Assignment8/Backend/delete_book.php';

  constructor(private _http: HttpClient) { }

  deleteRequest(bookId: number): Observable<any> {
    return this._http.post(this._url, bookId);
  }
}
