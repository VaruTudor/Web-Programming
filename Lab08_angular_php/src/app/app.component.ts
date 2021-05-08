import { Component } from '@angular/core';
import {User} from "./user";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Assignment8';
  userModel = new User('');

  loginResponse: string;


  constructor(private _loginService: LoginService) {}

  onLogin(): void{
    this._loginService.loginRequest(this.userModel)
      .subscribe(
        data => this.loginResponse = `Welcome ${data}`,
        error => this.loginResponse = 'Login unsuccessful'
      );
  }


}
