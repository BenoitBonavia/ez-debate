import {Component} from "@angular/core";
import {TagService} from "../../service/tag.service";
import {TagModel} from "../../models/tag.model";
import {TagTypeModel} from "../../models/tag-type.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationDialogComponent} from "../../common/confirmation-dialog/confirmation-dialog.component";
import {ConfirmationDialogConfigModel} from "../../common/confirmation-dialog/confirmation-dialog-config.model";

@Component({
  selector: 'ed-tags',
  templateUrl: 'tags.component.html'
})
export class TagsComponent {

  allTypes: TagTypeModel[];
  newType: TagTypeModel = new TagTypeModel();

  allTags: TagModel[] = [];
  newTags: TagModel[] = [];

  editedTag: TagModel = new TagModel();

  constructor(private tagService: TagService, private snackBar: MatSnackBar, private confirmationDialog: ConfirmationDialogComponent) {
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

  saveNewTagType() {
    if (!this.newType.type) return;
    return this.tagService.saveTagType(this.newType).subscribe(response => {
      this.allTypes.push(response);
      this.newType = new TagTypeModel();
      this.newTags.push(new TagModel());
      this.openSnackBar('Master tag created', 'Ok')
    })
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

  askForDelete(tag) {
    const config = new ConfirmationDialogConfigModel();
    config.question = "Do you really want to remove this tag ?"
    config.swapColors = true;
    this.confirmationDialog.openDialog(config);
    this.confirmationDialog.onClickYes.subscribe(() => {
      this.deleteTag(tag);
    })
  }

  setInEdit(tag: TagModel) {
    this.editedTag = Object.assign({}, tag);
  }

  clearEdit() {
    this.editedTag = new TagModel();
  }

  saveEditedTag(index) {
    this.tagService.saveTag(this.editedTag).subscribe(response => {
      this.allTags[index] = response;
      this.editedTag = new TagModel();
      this.openSnackBar('Modification saved', 'Ok');
    })
  }
}
