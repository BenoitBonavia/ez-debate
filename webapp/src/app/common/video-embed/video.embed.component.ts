import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import {EmbedVideoService} from 'ngx-embed-video';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'ed-video-embed',
  templateUrl: 'video.embed.component.html'
})
export class VideoEmbedComponent implements OnInit, AfterViewInit {

  @ViewChild("videoContainer", {static: false}) videoContainer: ElementRef;

  private domSanitizer: any;
  private _link: any = null;
  private width: number = null;
  private height: number = null;

  @Input() filter: boolean = null;
  @Input() position: string = "absolute";

  @Input()
  set link(link: string) {
    this._link = link;
    this.cdRef.detectChanges();
    this.setEmbed();
  }

  embed: any;

  constructor(private embedService: EmbedVideoService, private _domSanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) {
    this.domSanitizer = _domSanitizer;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.width = this.videoContainer.nativeElement.offsetWidth;
    this.height = this.width*(9/16);
    this.cdRef.detectChanges();
    this.setEmbed();
    console.log("set sizes " + this.width + " " + this.height);
  }

  setEmbed() {
    if (this.width != null && this.height != null && this._link != null) {
      this.embed = this.embedService.embed(this._link, {
        attr: {width: this.width, height: this.height}
      });
      console.log(this.embed);
      this.cdRef.detectChanges();
    }
  }
}

// this.embed = this.embedService.embed(link, {
//   attr: {width: this.width, height: this.width*(16/9)}
// })

