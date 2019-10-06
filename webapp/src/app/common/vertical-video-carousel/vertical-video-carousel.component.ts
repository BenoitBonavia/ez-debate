import {Component, Input} from "@angular/core";
import {VideoModel} from "../../models/video.model";

@Component({
  selector: 'ed-vertical-video-carousel',
  templateUrl: 'vertical-video-carousel.component.html',
  styleUrls: ['vertical-video-carousel.component.scss']
})
export class VerticalVideoCarouselComponent {

  @Input() height: number;
  @Input() width: number;
  @Input() videos: VideoModel[];

}
