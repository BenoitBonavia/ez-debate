import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'ed-horizontal-card-carousel',
  templateUrl: 'horizontal-card-carousel.component.html',
  styleUrls: ['horizontal-card-carousel.component.scss']
})
export class HorizontalCardCarouselComponent implements AfterViewChecked {

  @ViewChild('carouselContainer', {static: false}) verticalCardCarouselContainer: ElementRef;
  @ViewChild('verticalVideoCarouselContainer', {static: false}) verticalVideoCarouselContainer: ElementRef;
  @Input() desktopWidth: number = 50;
  @Input() tabletWidth: number = 70;
  @Input() mobileWidth: number = 90;
  @Input() datas: DataModel[];
  buttonPosition: number = 0;

  maxHeight: number = 0;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked(): void {
    if (this.datas !== undefined) {
      this.buttonPosition = this.verticalVideoCarouselContainer.nativeElement.offsetHeight/this.datas.length;
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
    let unitWidth = this.verticalCardCarouselContainer.nativeElement.scrollWidth/this.datas.length;
    this.verticalCardCarouselContainer.nativeElement.scrollLeft += unitWidth;
  }

  scrollLeft() {
    let unitWidth = this.verticalCardCarouselContainer.nativeElement.scrollWidth/this.datas.length;
    this.verticalCardCarouselContainer.nativeElement.scrollLeft -= unitWidth;
  }
}
