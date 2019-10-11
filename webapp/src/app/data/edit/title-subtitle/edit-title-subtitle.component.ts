import {Component, EventEmitter, Input, Output} from "@angular/core";
import {DataModel} from "../../../models/data.model";

@Component({
  selector: 'ed-edit-title-subtitle',
  templateUrl: 'edit-title-subtitle.component.html'
})
export class EditTitleSubtitleComponent {

    @Input() data: DataModel;
    @Output() dataChange = new EventEmitter<DataModel>();

    emitData() {
      this.dataChange.emit(this.data);
    }
}
