import { Component, OnInit } from '@angular/core';
import {DeleteService} from "./delete.service";
import {Observable} from "rxjs";

@Component({
  selector: 'delete-feature',
  templateUrl: './delete.component.html',
})
export class DeleteComponent implements OnInit {
  bookId: number;
  deleteResponse: string;

  constructor(private _deleteService: DeleteService) { }

  ngOnInit(): void {}

  onDelete(): void{
    this._deleteService.deleteRequest(this.bookId)
      .subscribe(
        data => this.deleteResponse = `${data}`,
        error => console.log(error)
      )
  }


}
