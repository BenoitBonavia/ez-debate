import {Component, Input} from "@angular/core";
import {SourceModel} from "../../models/source.model";

@Component({
  selector: 'ed-masonry-source-listing',
  templateUrl: 'source-masonry-listing.component.html'
})
export class SourceMasonryListingComponent {

  @Input() sources: SourceModel[];
}
