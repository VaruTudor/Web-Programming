import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { LoginService } from "./login.service";
import { AddService } from "./add/add.service";

import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import {DeleteService} from "./delete/delete.service";
import {UpdateService} from "./update/update.service";
import { BrowseComponent } from './browse/browse.component';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    DeleteComponent,
    UpdateComponent,
    BrowseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    AddService,
    DeleteService,
    UpdateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
