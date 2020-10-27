import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";

@Component({
  selector: 'ed-youtube-embeder',
  templateUrl: 'youtube-embeder.component.html'
})
export class YoutubeEmbederComponent implements AfterViewChecked {

  videoId: string = '';

  width: number = undefined;
  height: number = undefined;

  newOffsetWidth: number = undefined;

  @Output() sizeChange = new EventEmitter();
  @ViewChild('youtubeContainer', {static: false}) youtubeContainer: ElementRef;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  @Input()
  set url(url) {
    this.videoId = url.split('v=')[1];
    const ampersandIndex = this.videoId.indexOf('&');
    if (ampersandIndex !== -1) {
      this.videoId = this.videoId.substring(0, ampersandIndex)
    }
  }

  ngAfterViewChecked() {
    this.newOffsetWidth = this.youtubeContainer.nativeElement.offsetWidth;
    if (!this.newOffsetWidth || this.newOffsetWidth !== this.width) {
      this.width = this.newOffsetWidth;
      this.height = (this.newOffsetWidth / 16) * 9;
      this.sizeChange.emit();
      this.cdRef.detectChanges();
    }
  }
}
