import {Component, OnInit} from "@angular/core";
import {DataService} from "../../data.service";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'ed-data-listing',
  templateUrl: 'data-listing.component.html',
  styleUrls: ['data-listing.component.scss']
})
export class DataListingComponent implements OnInit {

  constructor(private dataService: DataService) {

  }

  datas: DataModel[];

  ngOnInit(): void {
    this.dataService.getAll().subscribe(response => {
      this.datas = response;
    })
  }

}
