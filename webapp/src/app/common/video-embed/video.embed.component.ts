import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'ed-video-embed',
  templateUrl: 'video.embed.component.html'
})
export class VideoEmbedComponent implements OnInit {

  @Input() link: string;
  // @ViewChild("videoContainer") videoContainer:ElementRef;

  embed: any;

  constructor(private embedService: EmbedVideoService) {

  }

  ngOnInit(): void {
    this.embed = this.embedService.embed(this.link, {
      query: {portrait: 0, color: '#000000'},

    });
  }

}
