import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {interval, Observable, Subject} from "rxjs";
import {filter, takeUntil, tap} from "rxjs/operators";

@Directive({
  selector: '[holdable]'
})
export class HoldableDirective {

  @Output() holdTime: EventEmitter<number> = new EventEmitter<number>();

  state: Subject<string> = new Subject<string>();

  cancel: Observable<string>;

  constructor() {
    this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v => {
        this.holdTime.emit(0);
      })
    );
  }

  @HostListener('touchend')
  // @HostListener('mouseup')
  onExit() {
    this.state.next('cancel');
  }

  @HostListener('touchstart')
  // @HostListener('mousedown')
  onHold() {
    this.state.next('start');
    const n = 100;
    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v => {
        this.holdTime.emit(v * n)
      })
    ).subscribe()
  }
}
