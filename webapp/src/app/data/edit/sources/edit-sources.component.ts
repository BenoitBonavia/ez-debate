import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SourceModel} from "../../../models/source.model";

@Component({
  selector: 'ed-edit-sources',
  templateUrl: 'edit-sources.component.html'
})
export class EditSourcesComponent {

  @Input() sources: SourceModel[];
  @Output() sourcesChange = new EventEmitter<SourceModel[]>();

  editTabOnType(index) {
    if (index == this.sources.length - 1 && this.sources[index].title !== undefined) {
      this.sourcesChange.emit(this.sources);
    }
  }

  removeSource(index) {
    this.sources.splice(index, 1);
    this.sourcesChange.emit(this.sources);
  }

  addNewSource() {
    if (this.sources[this.sources.length - 1].link) {
      this.sources.push(new SourceModel());
    }
  }
}
