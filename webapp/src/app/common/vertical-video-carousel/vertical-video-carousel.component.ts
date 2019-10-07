import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {VideoModel} from "../../models/video.model";

@Component({
  selector: 'ed-vertical-video-carousel',
  templateUrl: 'vertical-video-carousel.component.html',
  styleUrls: ['vertical-video-carousel.component.scss']
})
export class VerticalVideoCarouselComponent {

  @ViewChild('verticalVideoCarouselContainer', {static: false}) verticalVideoCarouselContainer: any;
  @Input() containerWidth: number;
  @Input() width: number;
  @Input() videos: VideoModel[];

  private margin: number = null;

  getMargin() {
    if (this.margin == null) {
      this.margin = (100-this.width)/2;
    }
    return this.margin;
  }

  toRight() {
    var currentScrollLeft = this.verticalVideoCarouselContainer.nativeElement.scrollLeft;
    var i = 0;
    while (i < currentScrollLeft) {
      i += this.width/100*this.containerWidth;
    }
    if (i == currentScrollLeft) {
      i += this.width/100*this.containerWidth;
    }
    this.verticalVideoCarouselContainer.nativeElement.scrollLeft = i;
  }

  toLeft() {
    var currentScrollLeft = this.verticalVideoCarouselContainer.nativeElement.scrollLeft - this.width/100*this.containerWidth;
    var i = 0;
    while (i < currentScrollLeft) {
      i += this.width/100*this.containerWidth;
    }
    this.verticalVideoCarouselContainer.nativeElement.scrollLeft = i;
  }
}