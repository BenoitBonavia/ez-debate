import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {TagModel} from "../../../models/tag.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {TagService} from "../../../service/tag.service";

@Component({
  selector: 'ed-edit-tags',
  templateUrl: 'edit-tags.component.html'
})
export class EditTagsComponent implements OnInit {

  @Input() tags: TagModel[];
  @Output() tagsChange = new EventEmitter<TagModel[]>();

  allTags: TagModel[] = [];
  selectable: boolean = true;
  removable: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur: boolean = true;

  constructor(private tagService: TagService) {

  }

  ngOnInit(): void {
    this.tagService.getAll().subscribe(response => {
      this.allTags = response;
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value != "") {
      let tag = new TagModel();
      tag.tag = value;
      this.tagService.saveTag(tag).subscribe(response => {
        this.tags.push(response);
      })
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tagId: number): void {
    this.tags.splice(tagId, 1);
  }

  addOnClick(tag: TagModel) {
    this.tags.push(tag);
  }
}
