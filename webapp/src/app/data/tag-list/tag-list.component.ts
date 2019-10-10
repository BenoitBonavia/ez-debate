import {Component, Input} from "@angular/core";
import {TagModel} from "../../models/tag.model";

@Component({
  selector: 'ed-tag-list',
  templateUrl: 'tag-list.component.html'
})
export class TagListComponent {

    @Input() tags: TagModel[];

}
