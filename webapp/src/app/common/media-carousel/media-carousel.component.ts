import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from "@angular/core";
import {MediaModel} from "../../models/media.model";

@Component({
  selector: 'ed-media-carousel',
  templateUrl: 'media-carousel.component.html',
  styleUrls: ['media-carousel.component.scss']
})
export class MediaCarouselComponent implements AfterViewChecked{

  @Input() medias: MediaModel[];
  @Input() shareButton: boolean = true;
  @ViewChildren('element') elements: QueryList<ElementRef>;
  @ViewChild('container') container: ElementRef;

  elementsArray: ElementRef[];

  hasToRecheck: boolean = true;

  currentElementIndex: number = 0;
  currentElement: ElementRef;

  containerWidth: number;
  videoWidth: number;

  leftMargin: number;
  rightMargin: number;

  navigator = navigator;

  constructor(private cdRef: ChangeDetectorRef) {

  }

  ngAfterViewChecked() {
    this.recheck();
    if (this.hasToRecheck) {
      console.log('reset');
      this.elementsArray = this.elements.toArray();
      this.containerWidth = this.container.nativeElement.offsetWidth;
      this.videoWidth = (this.container.nativeElement.offsetHeight / 9) * 16;

      this.leftMargin = Math.round((this.containerWidth - this.elementsArray[0].nativeElement.offsetWidth) / 2);
      this.rightMargin = Math.round((this.containerWidth - this.elementsArray[this.elementsArray.length - 1].nativeElement.offsetWidth) / 2);

      this.cdRef.detectChanges();
    }
  }

  recheck() {
    if (!this.hasToRecheck || !this.elementsArray) return;
    this.hasToRecheck = !((this.leftMargin === (this.containerWidth - this.elementsArray[0].nativeElement.offsetWidth) / 2) && (this.rightMargin === (this.containerWidth - this.elementsArray[this.elementsArray.length - 1].nativeElement.offsetWidth) / 2));
  }

  next() {
    if (this.elementsArray.length - 2 >= this.currentElementIndex) {
      this.container.nativeElement.scrollLeft += (this.elementsArray[this.currentElementIndex].nativeElement.offsetWidth + this.elementsArray[this.currentElementIndex + 1].nativeElement.offsetWidth)/2;
      this.currentElementIndex++;
    }
  }

  prev() {
    if (this.currentElementIndex > 0) {
      console.log(this.elementsArray[this.currentElementIndex].nativeElement.offsetWidth/2 + this.container.nativeElement.scrollLeft + this.elementsArray[this.currentElementIndex - 1].nativeElement.offsetWidth/2);
      this.container.nativeElement.scrollLeft -= (this.elementsArray[this.currentElementIndex].nativeElement.offsetWidth + this.elementsArray[this.currentElementIndex - 1].nativeElement.offsetWidth)/2;
      this.currentElementIndex--;
    }
  }

  share(title, url) {
    navigator.share({
      title: title,
      url: url
    }).then(() => {

    })
  }
}
