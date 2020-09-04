import {Directive, HostBinding, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: '[dropZone]'
})
export class DropZoneDirective {

  @HostBinding('class.fileover') fileOver: boolean;

  @Output() fileDropped = new EventEmitter();

  constructor() {
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) public ondrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
