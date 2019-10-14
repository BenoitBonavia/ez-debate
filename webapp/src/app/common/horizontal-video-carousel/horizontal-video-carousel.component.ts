import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {VideoModel} from "../../models/video.model";

@Component({
  selector: 'ed-horizontal-video-carousel',
  templateUrl: 'horizontal-video-carousel.component.html',
  styleUrls: ['horizontal-video-carousel.component.scss']
})
export class HorizontalVideoCarouselComponent {

  @ViewChild('verticalVideoCarouselContainer', {static: false}) verticalVideoCarouselContainer: any;
  logger: string = "";
  @Input() containerWidth: number;
  @Input() width: number;
  @Input() videos: VideoModel[];

  private margin: number = null;

  private scrollLeft: number = 0;

  getMargin() {
    if (this.margin == null) {
      this.margin = (100-this.width)/2;
    }
    return this.margin;
  }

  toRight() {
    var i = 0;
    while (i < this.scrollLeft) {
      i += this.width/100*this.containerWidth;
    }
    if (i == this.scrollLeft) {
      i += this.width/100*this.containerWidth;
    }
    this.verticalVideoCarouselContainer.nativeElement.scrollLeft = i;
    this.scrollLeft = this.verticalVideoCarouselContainer.nativeElement.scrollLeft;
  }

  toLeft() {
    var currentScrollLeft = this.scrollLeft - this.width/100*this.containerWidth;
    var i = 0;
    while (i < currentScrollLeft) {
      i += this.width/100*this.containerWidth;
    }
    // this.log(i);
    // this.log(this.verticalVideoCarouselContainer.nativeElement.scrollLeft);
    if (Math.trunc(i) === Math.trunc(this.verticalVideoCarouselContainer.nativeElement.scrollLeft)) {
      i = this.verticalVideoCarouselContainer.nativeElement.scrollLeft;
      i -= this.width/100*this.containerWidth;
    }
    this.verticalVideoCarouselContainer.nativeElement.scrollLeft = i;
    this.scrollLeft = this.verticalVideoCarouselContainer.nativeElement.scrollLeft;
  }

  getFilter(arg) {
      var middle = arg*this.width/100*this.containerWidth + (this.width/100*this.containerWidth)/2;
      if (this.scrollLeft < middle && middle < this.scrollLeft + this.width/100*this.containerWidth) {
        return false;
      }
      return true;
  }

  scrolling(arg) {
    this.scrollLeft = arg.target.scrollLeft;
  }

  log(val) {
    this.logger += val + "<br/>";
  }
}
