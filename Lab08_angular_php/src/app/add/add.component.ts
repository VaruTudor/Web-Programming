import { Component, OnInit } from '@angular/core';
import {AddService} from "./add.service";
import {Book} from "./book";

@Component({
  selector: 'add-feature',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  bookModel = new Book(0,'','','','');
  addResponse: string;

  constructor(private _addService: AddService) { }

  ngOnInit(): void {}

  onAdd(): void{
    this._addService.addRequest(this.bookModel)
      .subscribe(
        data => this.addResponse = `${data} added successfully`,
        error => this.addResponse = `Add failed`
      )
  }
}
