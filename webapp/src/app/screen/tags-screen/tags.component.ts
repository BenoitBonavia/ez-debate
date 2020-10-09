import {Component} from "@angular/core";
import {TagService} from "../../service/tag.service";
import {TagModel} from "../../models/tag.model";
import {TagTypeModel} from "../../models/tag-type.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationDialogComponent} from "../../common/confirmation-dialog/confirmation-dialog.component";
import {ConfirmationDialogConfigModel} from "../../common/confirmation-dialog/confirmation-dialog-config.model";

@Component({
  selector: 'ed-tags-screen',
  templateUrl: 'tags.component.html'
})
export class TagsComponent {

  allTypes: TagTypeModel[];

  allTags: TagModel[] = [];
  newTags: TagModel[] = [];

  constructor(private tagService: TagService) {
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
}
