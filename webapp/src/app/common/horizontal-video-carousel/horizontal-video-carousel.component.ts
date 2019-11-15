import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {VideoModel} from "../../models/video.model";

@Component({
  selector: 'ed-horizontal-video-carousel',
  templateUrl: 'horizontal-video-carousel.component.html',
  styleUrls: ['horizontal-video-carousel.component.scss']
})
export class HorizontalVideoCarouselComponent implements AfterViewInit {

  @ViewChild('verticalVideoCarouselContainer', {static: false}) verticalVideoCarouselContainer: any;
  @Input() containerWidth: number;
  @Input() width: number;
  @Input() videos: VideoModel[];

  private margin: number = null;
  private displayVideo: boolean = false;
  private scrollLeft: number = 0;
  private inited = false;
  private currentVideoLink: string = "";

  getMargin() {
    if (this.margin == null) {
      this.margin = (100-this.width)/2;
    }
    return this.margin;
  }

  ngAfterViewInit(): void {
    this.inited = true;
  }

  toRight() {
    if (this.inited) this.verticalVideoCarouselContainer.nativeElement.scrollLeft += this.width/100*this.containerWidth;
  }

  toLeft() {
    if (this.inited) this.verticalVideoCarouselContainer.nativeElement.scrollLeft -= this.width/100*this.containerWidth;
  }

  // toRight() {
  //   var i = 0;
  //   while (i < this.scrollLeft) {
  //     i += this.width/100*this.containerWidth;
  //   }
  //   if (i == this.scrollLeft) {
  //     i += this.width/100*this.containerWidth;
  //   }
  //   this.verticalVideoCarouselContainer.nativeElement.scrollLeft = i;
  //   this.scrollLeft = this.verticalVideoCarouselContainer.nativeElement.scrollLeft;
  // }
  //
  // toLeft() {
  //   var currentScrollLeft = this.scrollLeft - this.width/100*this.containerWidth;
  //   var i = 0;
  //   while (i < currentScrollLeft) {
  //     i -= this.width/100*this.containerWidth;
  //   }
  //   if (Math.trunc(i) === Math.trunc(this.verticalVideoCarouselContainer.nativeElement.scrollLeft)) {
  //     i = this.verticalVideoCarouselContainer.nativeElement.scrollLeft;
  //     i -= this.width/100*this.containerWidth;
  //   }
  //   this.verticalVideoCarouselContainer.nativeElement.scrollLeft = i;
  //   this.scrollLeft = this.verticalVideoCarouselContainer.nativeElement.scrollLeft;
  // }

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

  openFullSizeVideo(link) {
    this.displayVideo = true;
    this.currentVideoLink = link;
  }
}
