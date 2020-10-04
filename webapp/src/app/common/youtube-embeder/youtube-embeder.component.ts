import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input, Output,
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

  newOffsetHeight: number = undefined;
  newOffsetWidth: number = undefined;

  fixedHeight: number = undefined;

  @Input()
  set url(url) {
    this.videoId = url.split('v=')[1];
    const ampersandIndex = this.videoId.indexOf('&');
    if (ampersandIndex !== -1) {
      this.videoId = this.videoId.substring(0, ampersandIndex)
    }
  }

  @Output() sizeChange = new EventEmitter();
  @Input() fullHeight: boolean = true;

  @ViewChild('youtubeContainer', {static: false}) youtubeContainer: ElementRef;

  constructor(private cdRef: ChangeDetectorRef) {

  }

  ngAfterViewChecked() {
    this.newOffsetWidth = this.youtubeContainer.nativeElement.offsetWidth;
    this.newOffsetHeight = this.youtubeContainer.nativeElement.offsetHeight;
    if (!this.newOffsetHeight || !this.newOffsetWidth || this.newOffsetHeight !== this.height || this.newOffsetWidth !== this.width) {
      this.width = this.newOffsetWidth;
      this.height = this.newOffsetHeight;
      this.fixedHeight = (this.newOffsetWidth / 16) * 9;
      this.sizeChange.emit();
      this.cdRef.detectChanges();
    }
  }
}
