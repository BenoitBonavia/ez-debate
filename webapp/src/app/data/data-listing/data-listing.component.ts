import {Component, Input, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {DataModel} from "../../models/data.model";
import {PaginationService} from "../../service/pagination.service";

@Component({
  selector: 'ed-data-listing',
  templateUrl: 'data-listing.component.html'
})
export class DataListingComponent implements OnInit {

  @Input() datas: DataModel[];

  constructor(private paginationSerivce: PaginationService) {
  }

  ngOnInit(): void {

  }

  getPostPerPage() {
    return this.paginationSerivce.getPostPerPage();
  }

}
