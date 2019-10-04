import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'ed-video-embed',
  templateUrl: 'video.embed.component.html'
})
export class VideoEmbedComponent implements OnInit {

  @Input()
  set link(link: string) {
    try {
      this.embed = this.embedService.embed(link, {
        attr: {width: this.width, height: this.height}
      })
    } catch {
      console.log("Bad link for the video embed");
    }
  }

  @Input() width: number;
  @Input() height: number;
  // @ViewChild("videoContainer") videoContainer:ElementRef;

  embed: any;

  constructor(private embedService: EmbedVideoService) {

  }

  ngOnInit(): void {

  }

}
