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
    this.activatedRoute.queryParams.subscribe(params => {
      let paramTag = params.tag;
      if (paramTag) {
        this.params += paramTag + " ";
        this.searchService.search(paramTag).subscribe(response => {
          this.datas = response;
          this.inited = true;
        })
      }
      else {
        this.searchService.search(this.params).subscribe(response => {
          this.datas = response;
          this.inited = true;
        })
      }
    });
  }

  search() {
    this.searchService.search(this.params).subscribe(response => {
      console.log("test1");
      this.datas = response;
    })
  }
}
