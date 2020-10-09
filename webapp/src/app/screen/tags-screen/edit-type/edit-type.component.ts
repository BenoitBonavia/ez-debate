import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagTypeModel} from "../../../models/tag-type.model";
import {TagModel} from "../../../models/tag.model";
import {TagService} from "../../../service/tag.service";
import {ConfirmationDialogConfigModel} from "../../../common/confirmation-dialog/confirmation-dialog-config.model";
import {ConfirmationDialogComponent} from "../../../common/confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ed-edit-type',
  templateUrl: './edit-type.component.html'
})
export class EditTypeComponent {

  @Input() allTypes: TagTypeModel[];
  @Output() allTypesChange = new EventEmitter<TagTypeModel[]>();

  newType: TagTypeModel = new TagTypeModel();
  editedTagType: TagTypeModel = new TagTypeModel();

  constructor(private tagService: TagService, private confirmationDialog: ConfirmationDialogComponent, private snackBar: MatSnackBar) { }

  saveNewTagType() {
    if (!this.newType.type) return;
    return this.tagService.saveTagType(this.newType).subscribe(response => {
      this.allTypes.push(response);
      this.allTypesChange.emit(this.allTypes);
      this.newType = new TagTypeModel();
      this.snackBar.open('Master tag created', 'Ok', {duration: 2000});
    })
  }

  askForDeleteType(tagType) {
    const config = new ConfirmationDialogConfigModel();
    config.question = "Do you really want to remove this master tag ?";
    config.swapColors = true;
    this.confirmationDialog.openDialog(config);
    this.confirmationDialog.onClickYes.subscribe(() => {
      this.deleteTagType(tagType);
    })
  }

  deleteTagType(tagType) {
    this.tagService.deleteTagType(tagType).subscribe(() => {
      this.allTypes.splice(this.allTypes.indexOf(tagType), 1);
      this.allTypesChange.emit(this.allTypes);
      this.snackBar.open('Master tag removed', 'Ok', {duration: 2000});
    }, error => {
      this.snackBar.open('You can\'t delete this master tag until you haven\'t delete every linked tag', 'Ok', {duration: 4000});
    })
  }

  saveEditedTagType(index) {
    this.tagService.saveTagType(this.editedTagType).subscribe(response => {
      this.allTypes[index] = response;
      this.editedTagType = new TagTypeModel();
      this.snackBar.open('Modification saved', 'Ok', {duration: 2000});
    })
  }

  setInEditType(type: TagTypeModel) {
    this.editedTagType = type;
  }

  clearEditType() {
    this.editedTagType = new TagTypeModel();
  }
}
