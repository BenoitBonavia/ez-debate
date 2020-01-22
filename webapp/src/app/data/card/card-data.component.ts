import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output, Renderer2,
  ViewChild
} from "@angular/core";
import {DataModel} from "../../models/data.model";

@Component({
  selector: '' +
    'ed-card-data',
  templateUrl: 'card-data.component.html',
  styleUrls: ['card-data.component.scss']
})
export class CardDataComponent implements AfterViewInit {

  _minHeight: number = 0;
  cardHeightNumber: number = 0;
  viewInited: boolean = false;
  diff: number;

  @Input() data: DataModel;
  @Input() set minHeight(value: number) {
    this._minHeight = value;
    if (this.viewInited == true && this.card.nativeElement.offsetHeight < this._minHeight) {
      this.diff = this._minHeight - this.card.nativeElement.offsetHeight + this.text.nativeElement.offsetHeight;
      this.text.nativeElement.style.height = this.diff + "px";
    }
  }
  @Input() limitContentHeight: boolean = false;
  @Output() cardHeight = new EventEmitter<number>();
  @ViewChild("card", {static: false}) card: ElementRef;
  @ViewChild("text", {static: false}) text: ElementRef;

  constructor(private cdRef: ChangeDetectorRef, private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {
    this.viewInited = true;
    if (this._minHeight != 0 && this.card.nativeElement.offsetHeight < this._minHeight) {
      this.diff = this._minHeight - this.card.nativeElement.offsetHeight + this.text.nativeElement.offsetHeight;
      this.text.nativeElement.style.height = this.diff + "px";
    }
    this.cardHeightNumber = this.card.nativeElement.offsetHeight;
    this.cardHeight.emit(this.cardHeightNumber);
  }
}
