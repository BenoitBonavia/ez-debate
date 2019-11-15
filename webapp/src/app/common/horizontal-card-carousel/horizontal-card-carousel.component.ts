import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'ed-horizontal-card-carousel',
  templateUrl: 'horizontal-card-carousel.component.html',
  styleUrls: ['horizontal-card-carousel.component.scss']
})
export class HorizontalCardCarouselComponent {

  @ViewChild('verticalVideoCarouselContainer', {static: false}) verticalCardCarouselContainer: ElementRef;
  @Input() desktopWidth: number = 30;
  @Input() tabletWidth: number = 50;
  @Input() mobileWidth: number = 90;
  @Input() datas: DataModel[];

  maxHeight: number = 0;

  constructor(private cdRef: ChangeDetectorRef) {

  }

  setMaxHeight(value) {
    if (value > this.maxHeight) {
      this.maxHeight = value;
      this.cdRef.detectChanges();
    }
  }

  scrollLeft(mobile) {
    console.log(mobile);
    console.log('scroll left');
  }

  scrollRight(mobile) {
    console.log(mobile);
    console.log('scroll right');
  }
}
