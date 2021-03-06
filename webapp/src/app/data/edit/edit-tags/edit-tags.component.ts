import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {TagModel} from "../../../models/tag.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {TagService} from "../../../service/tag.service";
import {TagTypeModel} from "../../../models/tag-type.model";

@Component({
  selector: 'ed-edit-tags',
  templateUrl: 'edit-tags.component.html'
})
export class EditTagsComponent implements OnInit {

  @Input() tags: TagModel[];
  @Output() tagsChange = new EventEmitter<TagModel[]>();

  @Input() createNewTags: boolean = false;

  allTags = {};
  typeFavorite = {};

  allTypes: TagTypeModel[];

  newTagType: TagTypeModel = null;
  newTagName: string = "";

  constructor(private tagService: TagService) {

  }

  ngOnInit(): void {
    this.tagService.getAllTypes().subscribe(response => {
      this.allTypes = response;
      this.allTypes.forEach(tagType => {
        this.tagService.getTagsByType(tagType).subscribe(tagsResponse => {
          this.allTags[tagType.type] = tagsResponse;
          this.typeFavorite[tagType.type] = true;
        })
      })
    })
  }

  saveNewTag() {
    if (this.newTagName != "" && this.newTagType != null) {
      let newTag = new TagModel();
      newTag.tag = this.newTagName;
      newTag.type = this.newTagType;
      this.tagService.saveTag(newTag).subscribe(response => {
        this.tags.push(response);
        this.tagsChange.emit(this.tags);
        this.newTagName = "";
        this.newTagType = null;
      })
    }
  }

  remove(tagId: number): void {
    this.tags.splice(tagId, 1);
    this.tagsChange.emit(this.tags);
  }

  addOnClick(tag: TagModel) {
    this.tags.push(tag);
    this.tagsChange.emit(this.tags);
  }

  filterTagsByType(tags: TagModel[], type: TagTypeModel, favorite: boolean) {
    return tags.filter(tag => tag.type.id == type.id && tag.favorite == favorite);
  }

  onlyFavorite(tags: TagModel[], filtered: boolean) {
    if (tags) {
      if (filtered === true) {
        return tags.filter(tag => tag.favorite === true);
      }
      return tags;
    }
  }

}
