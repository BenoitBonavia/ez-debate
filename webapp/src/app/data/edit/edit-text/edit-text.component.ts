import {Component, EventEmitter, Input, Output} from "@angular/core";
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'ed-edit-text',
  templateUrl: 'edit-text.component.html'
})
export class EditTextComponent {

  @Input() text: string;
  @Output() textChange = new EventEmitter();

  editor = DecoupledEditor;
  config = {
    toolbar: [
      'Undo',
      'Redo',
      '|',
      'Bold',
      'Italic',
      'Underline',
      'Strikethrough',
      '|',
      'Alignment',
      '|',
      'BulletedList',
      'NumberedList',
      '|',
      'Indent',
      'Outdent'
    ],
    styles: [

    ]
  }

  emitText() {
    this.textChange.emit(this.text);
  }

  onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
}
