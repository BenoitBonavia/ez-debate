import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MediaModel} from "../../../models/media.model";
import {SourceModel} from "../../../models/source.model";

@Component({
  selector: 'ed-edit-videos',
  templateUrl: 'edit-videos.component.html'
})
export class EditVideosComponent {

  @Input() medias: MediaModel[];
  @Output() mediasChange = new EventEmitter<MediaModel[]>();

  handleUploadedFile(event) {
    if (event.type.includes("image")) {
      console.log(this.medias);
      if (this.medias.length === 0 || this.medias[this.medias.length-1].link !== "" && this.medias[this.medias.length-1].title !== "") {
        this.medias.push(new MediaModel());
      }
      this.medias[this.medias.length-1].link = event.data.Location;
      this.medias[this.medias.length-1].type = event.type;
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
}
