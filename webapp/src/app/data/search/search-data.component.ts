import {Component, OnInit} from "@angular/core";
import {SearchService} from "../../service/search.service";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'ed-all-data',
  templateUrl: 'search-data.component.html'
})
export class SearchDataComponent implements OnInit {

  constructor(private searchService: SearchService) {

  }

  private datas: DataModel[] = [];
  private params: string = "";

  ngOnInit(): void {
    this.searchService.search(this.params).subscribe(response => {
      this.datas = response;
    })
  }

  search() {
    this.searchService.search(this.params).subscribe(response => {
      this.datas = response;
    })
  }
}
