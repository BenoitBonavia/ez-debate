import {Component, Input, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'ed-data-listing',
  templateUrl: 'data-listing.component.html',
  styleUrls: ['data-listing.component.scss']
})
export class DataListingComponent implements OnInit {

  @Input() datas: DataModel[];

  ngOnInit(): void {

  }

}
