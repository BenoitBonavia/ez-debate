import {Component, OnInit} from "@angular/core";
import {SearchService} from "../../service/search.service";
import {DataModel} from "../../models/data.model";
import {ActivatedRoute} from "@angular/router";
import {PaginationService} from "../../service/pagination.service";

@Component({
  selector: 'ed-all-data',
  templateUrl: 'search-data.component.html',
  styleUrls: ['search-data.component.scss']
})
export class SearchDataComponent implements OnInit {

  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute, private paginationService: PaginationService) {

  }

  datas: DataModel[];
  params: string = "";

  loading = false;
  over = true;
  page = 1;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let paramTag = params.text;
      if (paramTag) this.params = paramTag;
    });
  }

  search() {
    this.searchService.search(this.params, 0).subscribe(response => {
      this.datas = response;
      this.page = 1;
      this.over = response.length < this.paginationService.getPostPerPage();
      // We change the url of the page to keep the research when we refresh the page
      window.history.replaceState({}, '', `/research?text =` + this.params);
    })
  }

  extendData() {
    this.loading = true;
    this.searchService.search(this.params, this.page).subscribe(response => {
      if (response.length > 0) {
        this.addResults(response, 0);
        this.page++;
      }
      if (response.length < this.paginationService.getPostPerPage()) {
        this.over = true;
      }
      this.loading = false;
    });
  }

  addResults(response, index) {
    setTimeout(() => {
      this.datas.push(response[index]);
      if (index < response.length-1) {
        this.addResults(response, index+1);
      }
    }, 200);
  }

  getPostPerPage() {
    this.paginationService.getPostPerPage();
  }
}
