import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MediaModel} from "../../../models/media.model";
import {SourceModel} from "../../../models/source.model";
import {MatSnackBar, matSnackBarAnimations} from "@angular/material/snack-bar";

@Component({
  selector: 'ed-edit-medias',
  templateUrl: 'edit-medias.component.html'
})
export class EditMediasComponent {

  @Input() medias: MediaModel[];
  @Output() mediasChange = new EventEmitter<MediaModel[]>();

  constructor(private matSnackBar: MatSnackBar) {
  }

  handleUploadedFile(event) {
    if (event.type.includes("image")) {
      console.log(this.medias);
      if (this.medias.length === 0 || this.medias[this.medias.length - 1].link !== "" && this.medias[this.medias.length - 1].title !== "") {
        this.medias.push(new MediaModel());
      }
      this.medias[this.medias.length - 1].link = event.data.Location;
      this.medias[this.medias.length - 1].type = event.type;
      this.mediasChange.emit(this.medias);
    }
  }

  addVideoLink(index) {
    if (index == this.medias.length - 1 && this.medias[index].link !== undefined && this.medias[index].link !== "") {
      this.mediasChange.emit(this.medias);
    }
  }

  removeVideo(index) {
    this.medias.splice(index, 1);
    this.mediasChange.emit(this.medias);
  }

  addNewVideo() {
    if (this.medias.length === 0 || this.medias[this.medias.length - 1].link) {
      this.medias.push(new MediaModel());
    }
  }

  setType(media, index) {
    if (media.link.includes('youtu')) {
      media.type = "video";
    } else if (media.link.match(/\.(jpeg)$/) != null) {
      media.type = "image/jpeg";
    } else if (media.link.match(/\.(jpg)$/) != null) {
      media.type = "image/jpg";
    } else if (media.link.match(/\.(gif)$/) != null) {
      media.type = "image/gif";
    } else if (media.link.match(/\.(png)$/) != null) {
      media.type = "image/png";
    } else {
      this.matSnackBar.open("Handled links : youtube, jpeg, jpg, gif or png image", "Ok", {duration: 4000});
      this.medias = (this.medias.length === 1) ? [] : this.medias.slice(index - 1, 1);
    }
  }
}
