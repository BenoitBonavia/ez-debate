import {Component, EventEmitter, Input, Output} from "@angular/core";
import {VideoModel} from "../../../models/video.model";

@Component({
  selector: 'ed-edit-videos',
  templateUrl: 'edit-videos.component.html'
})
export class EditVideosComponent {

  @Input() videos: VideoModel[];
  @Output() videosChange = new EventEmitter<VideoModel[]>();

  addVideoLink(index) {
    if (index == this.videos.length - 1 && this.videos[index].title !== undefined) {
      this.videos.push(new VideoModel());
      this.videosChange.emit(this.videos);
    }
  }

  removeVideo(index) {
    this.videos.splice(index, 1);
    this.videosChange.emit(this.videos);
  }
}
