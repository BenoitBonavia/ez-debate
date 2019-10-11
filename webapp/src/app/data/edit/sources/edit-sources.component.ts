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
      this.sources.push(new SourceModel());
    }
  }
}
