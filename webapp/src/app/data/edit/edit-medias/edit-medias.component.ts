import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MediaModel} from "../../../models/media.model";
import {SourceModel} from "../../../models/source.model";
import {MatSnackBar, matSnackBarAnimations} from "@angular/material/snack-bar";
import {RutubeService} from "../../../service/rutube.service";

@Component({
  selector: 'ed-edit-medias',
  templateUrl: 'edit-medias.component.html',
  styleUrls: ['edit-medias.component.scss']
})
export class EditMediasComponent {

  @Input() medias: MediaModel[] = [];
  @Output() mediasChange = new EventEmitter<MediaModel[]>();

  constructor(private matSnackBar: MatSnackBar, private rutubeService: RutubeService, private cdRef: ChangeDetectorRef) {
  }

  handleUploadedFile(event) {
    if (this.medias.length === 0 || this.medias[this.medias.length - 1].link !== "" || this.medias[this.medias.length - 1].title !== "" || this.medias[this.medias.length - 1].uploaded === false) {
      this.medias.push(new MediaModel());
    }
    if (event.type.includes("image")) {
      this.medias[this.medias.length - 1].link = event.data.Location;
      this.medias[this.medias.length - 1].type = event.type;
      this.mediasChange.emit(this.medias);
    } else if (event.type.includes("video")) {
      this.medias[this.medias.length - 1].uploaded = false;
      this.rutubeService.uploadVideo(event.data.Location, event.data.Key).subscribe(response => {
        this.medias[this.medias.length - 1].link = "https://rutube.ru/play/embed/" + response.videoId + "?isfulltab=true";
        this.medias[this.medias.length - 1].type = "video";
        this.medias[this.medias.length - 1].uploaded = true;
        this.mediasChange.emit(this.medias);
      }, error => {
        this.matSnackBar.open("An error occured during the video upload", "Ok", {duration: 2000});
        this.medias = this.medias.slice(this.medias.length - 1, 1);
      });
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
    if (media.link.includes('youtu') || media.link.includes('rutube')) {
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

  detectChanges() {
    this.cdRef.detectChanges();
  }
}
