import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from "@angular/core";
import {MediaModel} from "../../models/media.model";

@Component({
  selector: "ed-video-embeder",
  templateUrl: "video.embeder.component.html"
})
export class VideoEmbederComponent {

  @Input() video: MediaModel;
  @Output() sizeChange = new EventEmitter();

  constructor(private cdRef: ChangeDetectorRef) {

  }

  detectChanges() {
    this.cdRef.detectChanges();
    this.sizeChange.emit();
  }
}
