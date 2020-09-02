import {Component, OnInit} from "@angular/core";
import {DataModel} from "../models/data.model";
import {DataService} from "../service/data.service";
import {SearchService} from "../service/search.service";
import {TagService} from "../service/tag.service";
import {AuthenticatedUserService} from "../service/authenticated-user.service";
import {UserModel} from "../models/user.model";
import {delay} from "rxjs/operators";
import {PaginationService} from "../service/pagination.service";

@Component({
  selector: 'ed-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: UserModel;
  datas: DataModel[][] = [];
  pages: number[] = [];
  over: boolean[] = [];

  currentTag: number = 0;

  loading = false;

  constructor(private dataService: DataService, private searchService: SearchService, private tagService: TagService, private authenticatedUserService: AuthenticatedUserService, private paginationService: PaginationService) {

  }

  ngOnInit(): void {
    this.authenticatedUserService.authenticatedUser.subscribe(response => {
      this.currentUser = response;
    });
    for (let i = 0; i < this.currentUser.prefHome.length; i++) {
      this.pages[i] = 1;
      this.over[i] = false;
      this.searchService.searchByTag(this.currentUser.prefHome[i].tag, 0).subscribe(response => {
        this.datas[i] = response;
        if (response.length < this.paginationService.getPostPerPage()) {
          this.over[i] = true;
        }
      });
    }
  }

  changeCurrentTag(event) {
    this.currentTag = event.index;
  }

  extendData() {
    this.loading = true;
    this.searchService.searchByTag(this.currentUser.prefHome[this.currentTag].tag, this.pages[this.currentTag]).subscribe(response => {
      if (response.length > 0) {
        this.addResults(response, 0, this.currentTag);
        this.pages[this.currentTag]++;
      }
      if (response.length < this.paginationService.getPostPerPage()) {
        this.over[this.currentTag] = true;
      }
      this.loading = false;
    });
  }

  addResults(response, index, currentTag) {
    setTimeout(() => {
      this.datas[currentTag].push(response[index]);
      if (index < response.length-1) {
        this.addResults(response, index+1, currentTag);
      }
    }, 200);
  }
}
