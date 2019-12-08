import {ChangeDetectorRef, Component, Input} from "@angular/core";
import urlParser from 'js-video-url-parser/dist/jsVideoUrlParser';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "ed-video-thumbnail",
  templateUrl: "video.thumbnail.component.html"
})
export class VideoThumbnailComponent {

  _videoData: any;
  _provider: string;
  _videoId: string;
  _pictureLink: string = "";

  @Input() set video(url) {
    if (url == "") return;
    this._videoData = urlParser.parse(url);
    this._provider = this._videoData.provider;
    this._videoId = this._videoData.id;
    this.setPictureLink();
  }

  constructor(private http: HttpClient) {

  }

  setPictureLink() {
    if (this._provider == 'youtube') this._pictureLink = this.getYoutubeThumbnail();
    if (this._provider == 'dailymotion') this._pictureLink = this.getDailymotionThumbnail();
    if (this._provider == 'vimeo') this._pictureLink = this.getVimeoThumbnail();
  }

  getYoutubeThumbnail() {
    return "https://img.youtube.com/vi/" + this._videoId + "/maxresdefault.jpg";
  }

  getDailymotionThumbnail() {
    return "https://www.dailymotion.com/thumbnail/video/" + this._videoId;
  }

  getVimeoThumbnail() {
    this.http.get("http://vimeo.com/api/v2/video/" + this._videoId + ".json").subscribe(response => {
      console.log("bonjour");
      console.log(response[0]["thumbnail_large"]);
      this._pictureLink = response[0]["thumbnail_large"] + "";
    });
    return "";
  }
}
