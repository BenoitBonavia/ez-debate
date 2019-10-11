import {Component, OnInit} from "@angular/core";
import {SearchService} from "../../service/search.service";
import {DataModel} from "../../models/data.model";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'ed-all-data',
  templateUrl: 'search-data.component.html'
})
export class SearchDataComponent implements OnInit {

  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) {

  }

  datas: DataModel[] = [];
  params: string = "";
  inited = false;

  ngOnInit(): void {
    this.searchService.search(this.params).subscribe(response => {
      console.log("test");
      this.datas = response;
    });
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      this.searchService.search(params['search']).subscribe(response => {
        this.datas = response;
        this.inited = true;
      });
    })
  }

  search() {
    this.searchService.search(this.params).subscribe(response => {
      console.log("test1");
      this.datas = response;
    })
  }
}
