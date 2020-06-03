import {Component} from "@angular/core";
import {TagService} from "../../service/tag.service";
import {TagModel} from "../../models/tag.model";
import {TagTypeModel} from "../../models/tag-type.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ed-tags',
  templateUrl: 'tags.component.html'
})
export class TagsComponent {

  allTags: TagModel[] = [];
  allTypes: TagTypeModel[];
  newTags: TagModel[] = [];

  constructor(private tagService: TagService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.tagService.getAllTypes().subscribe(response => {
      this.allTypes = response;
      response.forEach((element) => {
        let tag = new TagModel();
        tag.type = element;
        this.newTags.push(tag);
      })
    })
    this.tagService.getAll().subscribe(response => {
      this.allTags = response;
    });
  }

  filterTagsByType(tags: TagModel[], type: TagTypeModel) {
    return tags.filter(tag => tag.type.id == type.id);
  }

  switchFavorite(tag) {
    this.tagService.switchFavorite(tag.id).subscribe(response => {
      if (response) tag.favorite = response.favorite;
    })
  }

  saveTagNewTag(index) {
    this.tagService.saveTag(this.newTags[index]).subscribe(response => {
      this.allTags.push(response);
      this.openSnackBar('Tag created', 'Ok')
      this.newTags[index].tag = '';
      this.newTags[index].favorite = false;
    });
  }

  saveTag(tag) {
    this.tagService.saveTag(tag).subscribe(response => {
      tag = response;
      this.openSnackBar('Tag saved', 'Ok')
    })
  }

  deleteTag(tag) {
    this.tagService.deleteTag(tag).subscribe(response => {
      this.allTags.splice(this.allTags.indexOf(tag), 1);
      this.openSnackBar('Tag removed', 'Ok');
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
