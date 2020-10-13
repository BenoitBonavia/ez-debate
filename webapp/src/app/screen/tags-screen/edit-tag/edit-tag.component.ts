import {Component, Input} from '@angular/core';
import {TagModel} from "../../../models/tag.model";
import {TagTypeModel} from "../../../models/tag-type.model";
import {TagService} from "../../../service/tag.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationDialogConfigModel} from "../../../common/confirmation-dialog/confirmation-dialog-config.model";
import {ConfirmationDialogComponent} from "../../../common/confirmation-dialog/confirmation-dialog.component";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Component({
  selector: 'ed-edit-tag',
  templateUrl: './edit-tag.component.html'
})
export class EditTagComponent {

  @Input() tagType: TagTypeModel = new TagTypeModel();

  filterInput: FormControl = new FormControl();

  newTag: TagModel = new TagModel();
  editedTag: TagModel = new TagModel();
  allTags: TagModel[];
  filteredTags: Observable<TagModel[]>;

  constructor(private tagService: TagService, private matSnackBar: MatSnackBar, private confirmationDialog: ConfirmationDialogComponent) {
    this.filteredTags = this.filterInput.valueChanges.pipe(
      startWith(null),
      map((tag: string) => tag ? this._filter(tag) : this.allTags.slice())
    );
  }

  ngOnInit(): void {
    this.tagService.getTagsByType(this.tagType).subscribe(response => {
      this.allTags = response;
    });
    this.newTag.type = this.tagType;
  }

  private _filter(value): TagModel[] {
    const lowerCaseValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.tag.toLowerCase().indexOf(lowerCaseValue) === 0)
  }

  filterTagsByType(tags: TagModel[], type: TagTypeModel) {
    return tags.filter(tag => tag.type.id == type.id);
  }

  switchFavorite(tag) {
    this.tagService.switchFavorite(tag.id).subscribe(response => {
      if (response) tag.favorite = response.favorite;
    })
  }

  saveTagNewTag() {
    this.tagService.saveTag(this.newTag).subscribe(response => {
      this.allTags.push(response);
      this.matSnackBar.open('Tag created', 'Ok', {duration: 2000});
      this.newTag.tag = '';
      this.newTag.favorite = false;
    });
  }

  setInEdit(tag: TagModel) {
    this.editedTag = Object.assign({}, tag);
  }

  clearEdit() {
    this.editedTag = new TagModel();
  }

  askForDelete(tag) {
    const config = new ConfirmationDialogConfigModel();
    config.question = "Do you really want to remove this tag ?";
    config.swapColors = true;
    this.confirmationDialog.openDialog(config);
    this.confirmationDialog.onClickYes.subscribe(() => {
      this.deleteTag(tag);
    })
  }

  saveEditedTag(index) {
    this.tagService.saveTag(this.editedTag).subscribe(response => {
      this.allTags[index] = response;
      this.editedTag = new TagModel();
      this.matSnackBar.open('Modification saved', 'Ok', {duration: 2000});
    })
  }

  deleteTag(tag) {
    this.tagService.deleteTag(tag).subscribe(response => {
      this.allTags.splice(this.allTags.indexOf(tag), 1);
      this.matSnackBar.open('Tag removed', 'Ok', {duration: 2000});
    })
  }
}
