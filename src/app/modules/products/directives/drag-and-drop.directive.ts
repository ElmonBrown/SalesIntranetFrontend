import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dragAndDrop]'
})
export class DragAndDropDirective {

  @Output() fileDropped = new EventEmitter();

  @HostListener('dragover', ['$event']) onDragOver(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.fileover = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.fileover = false;
  }

  @HostListener('drop', ['$event']) public ondrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.fileover = false;

    const files = e.dataTransfer.files;
    if(files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  @HostBinding('class.fileover') fileover: boolean;

  constructor() { }

}
