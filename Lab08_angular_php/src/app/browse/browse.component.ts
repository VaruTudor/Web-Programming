import { Component, OnInit } from '@angular/core';
import {BrowseService} from "./browse.service";

@Component({
  selector: 'browse-feature',
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {

  browseResponse: string
  browseGroupedResponse: string

  constructor(private _browseService: BrowseService) { }

  ngOnInit(): void {}

  onBrowse(): void{
    this._browseService.browseRequest(0)
      .subscribe(
        data => this.browseResponse = `${data}`,
        error => this.browseResponse = "Browse failed"
      )
  }

  onGroupedBrowse(): void {
    this._browseService.browseRequest(1)
      .subscribe(
        data => this.browseGroupedResponse = `${data}`,
        error => this.browseGroupedResponse = "Browse failed"
      )
  }
}
