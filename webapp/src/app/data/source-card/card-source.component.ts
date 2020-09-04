import {Component, Input} from "@angular/core";
import {SourceModel} from "../../models/source.model";

@Component({
  selector: 'ed-card-source',
  templateUrl: 'card-source.component.html'
})
export class CardSourceComponent {

  @Input() source: SourceModel;
}
