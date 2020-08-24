import {Component, OnInit} from "@angular/core";
import {DataModel} from "../models/data.model";
import {DataService} from "../service/data.service";
import {SearchService} from "../service/search.service";
import {TagService} from "../service/tag.service";

@Component({
  selector: 'ed-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  dataFrance: DataModel[];
  dataUSA: DataModel[];
  page = 0;

  constructor(private dataService: DataService, private searchService: SearchService, private tagService: TagService) {

  }

  ngOnInit(): void {
    this.searchService.searchByTag("France", this.page).subscribe(response => {
      this.dataFrance = response;
    })
    this.searchService.searchByTag("USA", this.page).subscribe(response => {
      this.dataUSA = response;
    })
    // this.dataService.getPageByTag("France", '0').subscribe(response => {
    //   this.dataFrance = response;
    //   console.log(response);
    // });
    // this.dataService.getPageByTag("USA", '0').subscribe(response => {
    //   this.dataUSA = response;
    //   console.log(response);
    // });
  }
}
