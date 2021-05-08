import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {User} from "./user";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = 'Assignment8/Backend/login.php';
  constructor(private _http: HttpClient) { }
  loginRequest(user: User): Observable<any> {
    return this._http.post<any>(this._url, user.username);
  }
}
