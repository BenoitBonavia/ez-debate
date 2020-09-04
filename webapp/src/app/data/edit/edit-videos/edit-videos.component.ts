import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {VideoModel} from "../../../models/video.model";
import {SourceModel} from "../../../models/source.model";

@Component({
  selector: 'ed-edit-videos',
  templateUrl: 'edit-videos.component.html'
})
export class EditVideosComponent {

  @Input() videos: VideoModel[];
  @Output() videosChange = new EventEmitter<VideoModel[]>();
  @ViewChild("videoContainer", {static: false}) card: ElementRef;

  addVideoLink(index) {
    if (index == this.videos.length - 1 && this.videos[index].link !== undefined && this.videos[index].link !== "") {
      this.videosChange.emit(this.videos);
    }
  }

  removeVideo(index) {
    this.videos.splice(index, 1);
    this.videosChange.emit(this.videos);
  }

  addNewVideo() {
    if (this.videos.length === 0 || this.videos[this.videos.length - 1].link) {
      this.videos.push(new VideoModel());
    }
  }
}
