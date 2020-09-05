import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";

@Component({
  selector: 'ed-youtube-embeder',
  templateUrl: 'youtube-embeder.component.html'
})
export class YoutubeEmbederComponent implements AfterViewChecked {

  videoId: string = '';
  width: number = undefined;
  height: number = undefined;

  @Input()
  set url(url) {
    this.videoId = url.split('v=')[1];
    const ampersandIndex = this.videoId.indexOf('&');
    if (ampersandIndex !== -1) {
      this.videoId = this.videoId.substring(0, ampersandIndex)
    }
  }

  @Input() fullHeight: boolean = true;

  @ViewChild('youtubeContainer', {static: false}) youtubeContainer: ElementRef;

  constructor(private cdRef: ChangeDetectorRef) {

  }

  ngAfterViewChecked() {
    this.width = this.youtubeContainer.nativeElement.offsetWidth;
    this.height = this.youtubeContainer.nativeElement.offsetHeight;
    this.cdRef.detectChanges();
  }
}
