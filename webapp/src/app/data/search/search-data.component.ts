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

  datas: DataModel[] = [];
  params: string = "";

  ngOnInit(): void {
    this.searchService.search(this.params).subscribe(response => {
      console.log("test");
      this.datas = response;
    })
  }

  search() {
    this.searchService.search(this.params).subscribe(response => {
      console.log("test1");
      this.datas = response;
    })
  }
}
