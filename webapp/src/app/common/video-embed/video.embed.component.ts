import {Component, Input, OnInit} from "@angular/core";
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'ed-video-embed',
  templateUrl: 'video.embed.component.html'
})
export class VideoEmbedComponent implements OnInit {

  embed: any;

  @Input() link: string;

  constructor(private embedService: EmbedVideoService) {

  }

  ngOnInit(): void {
    this.embed = this.embedService.embed(this.link);
  }

}
