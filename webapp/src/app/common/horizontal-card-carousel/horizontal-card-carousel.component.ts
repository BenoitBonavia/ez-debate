import {Component, Input, ViewChild} from "@angular/core";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'ed-horizontal-card-carousel',
  templateUrl: 'horizontal-card-carousel.component.html',
  styleUrls: ['horizontal-card-carousel.component.scss']
})
export class HorizontalCardCarouselComponent {

  @ViewChild('verticalVideoCarouselContainer', {static: false}) verticalVideoCarouselContainer: any;
  @Input() containerWidth: number;
  @Input() width: number;
  @Input() datas: DataModel[];

  private margin: number = null;

  private scrollLeft: number = 0;

  getMargin() {
    if (this.margin == null) {
      this.margin = (100-this.width)/2;
    }
    return this.margin;
  }

  scrolling(arg) {
    this.scrollLeft = arg.target.scrollLeft;
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
    if (Math.trunc(i) === Math.trunc(this.verticalVideoCarouselContainer.nativeElement.scrollLeft)) {
      i = this.verticalVideoCarouselContainer.nativeElement.scrollLeft;
      i -= this.width/100*this.containerWidth;
    }
    this.verticalVideoCarouselContainer.nativeElement.scrollLeft = i;
    this.scrollLeft = this.verticalVideoCarouselContainer.nativeElement.scrollLeft;
  }
}
