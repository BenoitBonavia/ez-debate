import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {EmbedVideoService} from "ngx-embed-video/dist";

@Component({
  selector: 'ed-full-screen-video',
  templateUrl: 'full-screen-video.component.html',
  styleUrls: ['full-screen-video.component.scss']
})
export class FullScreenVideoComponent implements OnInit, AfterViewInit {

  inited: boolean = false;
  embed: any;
  totalHeight: number;
  totalWidth: number;
  embedHeight: number;
  embedWidth: number;

  @Input() zIndex: number;
  @Input() video: string;
  @Output() close = new EventEmitter();

  constructor(private embedService: EmbedVideoService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.totalHeight = window.innerHeight;
    this.totalWidth = window.innerWidth;
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.totalWidth > this.totalHeight) {
      this.embedWidth = this.totalWidth * 0.6;
      this.embedHeight = this.embedWidth/16*9
    }
    else {
      this.embedWidth = this.totalWidth * 0.8;
      this.embedHeight = this.embedWidth/16*9
    }
    this.inited = true;
    this.cdRef.detectChanges();
  }
}
