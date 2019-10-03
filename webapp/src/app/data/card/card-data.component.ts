import {Component, Input} from "@angular/core";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'ed-card-data',
  templateUrl: 'card-data.component.html'
})
export class CardDataComponent {

  @Input() data: DataModel;

}
