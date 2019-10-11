import {Component, Input, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'ed-masonry-data-listing',
  templateUrl: 'data-masonry-listing.component.html'
})
export class DataMasonryListingComponent implements OnInit {

  @Input() datas: DataModel[];

  ngOnInit(): void {

  }

}
