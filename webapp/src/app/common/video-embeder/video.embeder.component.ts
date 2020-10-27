import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output} from "@angular/core";
import {MediaModel} from "../../models/media.model";

@Component({
  selector: "ed-video-embeder",
  templateUrl: "video.embeder.component.html"
})
export class VideoEmbederComponent implements AfterViewChecked {

  @Input() video: MediaModel;
  @Output() sizeChange = new EventEmitter();

  constructor(private cdRef: ChangeDetectorRef) {

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
    this.sizeChange.emit();
  }

  detectChanges() {
  }
}
