import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import urlParser from 'js-video-url-parser/dist/jsVideoUrlParser';
import Hammer from 'hammerjs';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: "ed-video-embeder",
  templateUrl: "video.embeder.component.html"
})
export class VideoEmbederComponent {

  private youtubeUrl: string = "https://www.youtube.com";
  private daylimotionUrl: string = "https://www.dailymotion.com";
  private vimeoUrl: string = "https://player.vimeo.com";

  _videoLink: SafeUrl = null;
  _videoData: any;
  _provider: string;

  @Input() width: number;
  @Input() height: number;

  @Output() toLeft = new EventEmitter();
  @Output() toRight = new EventEmitter();
  @ViewChild("iframe", {static: false}) iframe: ElementRef;

  @Input() set video(url) {
    if (url == "") return;
    this._videoData = urlParser.parse(url);
    this._provider = this._videoData.provider;

    console.log(this._videoData);
    this.setVideoLink();

    console.log(this._videoLink);

  }

  setVideoLink() {
    if (this._provider == 'youtube')
      this._videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl + "/embed/" + this._videoData.id + '?autoplay=0');
    if (this._provider == 'dailymotion')
      this._videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.daylimotionUrl + "/embed/video/" + this._videoData.id + "?autoplay=0");
    if (this._provider == 'vimeo')
      this._videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.vimeoUrl + "/video/" + this._videoData.id + "?color=3f51b5");
  }

  constructor(private sanitizer: DomSanitizer) {

  }

  left() {
    console.log("to left");
  }

  right() {
    console.log("to right");
  }
}