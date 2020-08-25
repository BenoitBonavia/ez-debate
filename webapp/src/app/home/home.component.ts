import {Component, OnInit} from "@angular/core";
import {DataModel} from "../models/data.model";
import {DataService} from "../service/data.service";
import {SearchService} from "../service/search.service";
import {TagService} from "../service/tag.service";
import {AuthenticatedUserService} from "../service/authenticated-user.service";
import {UserModel} from "../models/user.model";

@Component({
  selector: 'ed-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: UserModel;
  datas: DataModel[][] = [];
  pages: number[] = [];
  dataFrance: DataModel[];
  dataUSA: DataModel[];
  page = 0;

  constructor(private dataService: DataService, private searchService: SearchService, private tagService: TagService, private authenticatedUserService: AuthenticatedUserService) {

  }

  ngOnInit(): void {
    this.authenticatedUserService.authenticatedUser.subscribe(response => {
      this.currentUser = response;
    })
    for (let i = 0; i < this.currentUser.prefHome.length; i++) {
      this.pages[i] = 0;
      this.searchService.searchByTag(this.currentUser.prefHome[i].tag, this.pages[i]).subscribe(response => {
        this.datas[i] = response;
        console.log(response);
      })
    }
  }
}
