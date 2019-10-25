import {Component, OnInit} from "@angular/core";
import {DataModel} from "../models/data.model";
import {DataService} from "../service/data.service";

@Component({
  selector: 'ed-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  dataFrance: DataModel[];

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.getAllByTag("France").subscribe(response => {
      this.dataFrance = response;
    })
  }
}
