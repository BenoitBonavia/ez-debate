import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {EmbedVideoService} from "ngx-embed-video/dist";

@Component({
  selector: 'ed-full-screen-video',
  templateUrl: 'full-screen-video.component.html',
  styleUrls: ['full-screen-video.component.scss']
})
export class FullScreenVideoComponent implements AfterViewInit {

  _video: string;
  _display: boolean = false;
  inited: boolean = false;
  embed: any;
  totalHeight: number;
  totalWidth: number;
  embedHeight: number;
  embedWidth: number;

  @Input() zIndex: number;
  @Input() set display(value) {
    this._display = value;
    if (this.inited) this.ngAfterViewInit();
  };
  @ViewChild("fullScreenContainer", {static: false}) fullScreenContainer: ElementRef;
  @Input() set video(video) {
    this._video = video;
  }

  ngAfterViewInit(): void {
    this.totalHeight = this.fullScreenContainer.nativeElement.offsetHeight;
    this.totalWidth = this.fullScreenContainer.nativeElement.offsetWidth;
    if (this.totalWidth > this.totalHeight) {
      this.embedWidth = this.totalWidth * 0.6;
      this.embedHeight = this.embedWidth/16*9
    }
    else {
      this.embedWidth = this.totalWidth * 0.8;
      this.embedHeight = this.embedWidth/16*9
    }
    this.embed = this.embedService.embed(this._video, {attr: {width: this.embedWidth, height: this.embedHeight}})
    this.inited = true;
  }

  constructor(private embedService: EmbedVideoService) {

  }
}
