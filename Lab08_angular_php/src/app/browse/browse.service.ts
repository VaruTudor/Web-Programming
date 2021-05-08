import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  _url = 'Assignment8/Backend/view_books.php';

  constructor(private  _http: HttpClient) { }
  browseRequest(groupedView: number): Observable<any>{
    return this._http.post(this._url, groupedView)
  }
}
