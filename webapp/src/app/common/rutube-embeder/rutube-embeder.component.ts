import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";

@Component({
  selector: 'ed-rutube-embeder',
  templateUrl: 'rutube-embeder.component.html'
})
export class RutubeEmbederComponent implements AfterViewChecked {

  videoId: string = '';

  width: number = undefined;
  height: number = undefined;

  newOffsetWidth: number = undefined;

  @Output() sizeChange = new EventEmitter();
  @ViewChild('rutubeContainer', {static: false}) rutubeContainer: ElementRef;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  @Input()
  set url(url) {
    this.videoId = url.split('video/')[1];
    const ampersandIndex = this.videoId.indexOf('/');
    if (ampersandIndex !== -1) {
      this.videoId = this.videoId.substring(0, ampersandIndex)
    }
  }

  ngAfterViewChecked(): void {
    this.newOffsetWidth = this.rutubeContainer.nativeElement.offsetWidth
    if (!this.newOffsetWidth || this.newOffsetWidth !== this.width) {
      this.width = this.newOffsetWidth;
      this.height = (this.newOffsetWidth / 16) * 9;
      this.sizeChange.emit();
      this.cdRef.detectChanges();
    }
  }
}
