import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DataModel} from '../../models/data.model';

@Component({
  selector: 'ed-horizontal-card-carousel',
  templateUrl: 'horizontal-card-carousel.component.html',
  styleUrls: ['horizontal-card-carousel.component.scss']
})
export class HorizontalCardCarouselComponent implements AfterViewChecked {

  @ViewChild('carouselContainer', {static: false}) carouselContainer: ElementRef;
  @ViewChild('verticalCardCarouselContainer', {static: false}) verticalCardCarouselContainer: ElementRef;
  @Input() desktopWidth = 40;
  @Input() tabletWidth = 70;
  @Input() mobileWidth = 90;
  @Input() datas: DataModel[];
  buttonPosition = 0;

  maxHeight = 0;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked(): void {
    if (this.datas !== undefined) {
      this.buttonPosition = this.carouselContainer.nativeElement.offsetHeight / 2;
      this.cdRef.detectChanges();
    }
  }

  setMaxHeight(value) {
    if (value > this.maxHeight) {
      this.maxHeight = value;
      this.cdRef.detectChanges();
    }
  }

  scrollRight() {
    const unitWidth = this.carouselContainer.nativeElement.scrollWidth / this.datas.length;
    this.carouselContainer.nativeElement.scrollLeft += unitWidth;
  }

  scrollLeft() {
    const scrollLeft = this.carouselContainer.nativeElement.scrollLeft;
    const unitWidth = this.carouselContainer.nativeElement.scrollWidth / this.datas.length;
    console.log(scrollLeft);
    console.log(unitWidth);
    if (unitWidth + 10 > scrollLeft) {
      this.carouselContainer.nativeElement.scrollLeft = 0;
      console.log(0);
    } else if (scrollLeft % unitWidth === 0) {
      this.carouselContainer.nativeElement.scrollLeft -= unitWidth;
      console.log(1);
    } else {
      this.carouselContainer.nativeElement.scrollLeft -= scrollLeft % unitWidth;
      console.log(2);
    }
  }
}
