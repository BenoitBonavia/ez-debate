import {Component, Input} from "@angular/core";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'ed-horizontal-card',
  templateUrl: 'horizontal-card-data.component.html'
})
export class HorizontalCardDataComponent {
  @Input() data: DataModel;

  constructor() {
  }
}
