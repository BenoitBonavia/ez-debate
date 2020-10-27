import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'ed-archive-video-embeder',
  templateUrl: './archive-video-embeder.component.html',
  styleUrls: ['./archive-video-embeder.component.scss']
})
export class ArchiveVideoEmbederComponent implements OnInit, AfterViewInit {

  videoId: string = '';

  width: number = undefined;
  height: number = undefined;

  newOffsetHeight: number = undefined;
  newOffsetWidth: number = undefined;

  fixedHeight: number = undefined;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  @Input()
  set url(url) {
    this.videoId = url.split('details/')[1];
    const ampersandIndex = this.videoId.indexOf('/');
    if (ampersandIndex !== -1) {
      this.videoId = this.videoId.substring(0, ampersandIndex);
    }
  }

  @Output() sizeChange = new EventEmitter();
  @Input() fullHeight: boolean = true;

  @ViewChild('archiveContainer', {static: false}) archiveContainer: ElementRef;

  ngAfterViewChecked() {
    this.newOffsetWidth = this.archiveContainer.nativeElement.offsetWidth;
    this.newOffsetHeight = this.archiveContainer.nativeElement.offsetHeight;
    if (!this.newOffsetHeight || !this.newOffsetWidth || this.newOffsetHeight !== this.height || this.newOffsetWidth !== this.width) {
      this.width = this.newOffsetWidth;
      this.height = this.newOffsetHeight;
      this.fixedHeight = (this.newOffsetWidth / 16) * 9;
      this.sizeChange.emit();
      this.cdRef.detectChanges();
    }
  }

  ngAfterViewInit(): void {

  }
}
