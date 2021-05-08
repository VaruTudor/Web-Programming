import { Component, OnInit } from '@angular/core';
import {Book} from "../add/book";
import {UpdateService} from "./update.service";

@Component({
  selector: 'update-feature',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  bookModel = new Book(0,'','','','');
  updateResponse: string;

  constructor(private _updateService: UpdateService) { }

  ngOnInit(): void {}

  onUpdate(): void{
    this._updateService.updateRequest(this.bookModel)
      .subscribe(
        data => this.updateResponse = `${data}`,
        error => this.updateResponse = "Update failed"
      )
  }
}
