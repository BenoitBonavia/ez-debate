import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  EventEmitter
} from "@angular/core";

@Component({
  selector: 'ed-rutube-embeder',
  templateUrl: 'rutube-embeder.component.html'
})
export class RutubeEmbederComponent implements AfterViewChecked {

  width: number = undefined;
  height: number = undefined;

  newOffsetHeight: number = undefined;
  newOffsetWidth: number = undefined;

  fixedHeight: number = undefined;

  @ViewChild('rutubeContainer', {static: false}) rutubeContainer: ElementRef;


  @Output() sizeChange = new EventEmitter();
  @Input() url: string;
  @Input() fullHeight: boolean = true;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked(): void {
    this.newOffsetWidth = this.rutubeContainer.nativeElement.offsetWidth
    this.newOffsetHeight = this.rutubeContainer.nativeElement.offsetHeight
    if (!this.newOffsetHeight || !this.newOffsetWidth || this.newOffsetHeight !== this.height || this.newOffsetWidth !== this.width) {
      this.width = this.newOffsetWidth;
      this.height = this.newOffsetHeight;
      this.fixedHeight = (this.newOffsetWidth / 16) * 9;
      this.sizeChange.emit();
      this.cdRef.detectChanges();
    }
  }

}
