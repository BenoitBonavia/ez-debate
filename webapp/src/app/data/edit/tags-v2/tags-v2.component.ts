import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {TagModel} from "../../../models/tag.model";
import {TagService} from "../../../service/tag.service";
import {TagTypeModel} from "../../../models/tag-type.model";

@Component({
  selector: 'ed-edit-tags-v2',
  templateUrl: './tags-v2.component.html'
})
export class TagsV2Component implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();

  filteredTags: Observable<TagModel[]>;

  tags: TagModel[] = [];

  allTypes: TagTypeModel[] = [];
  allTags: TagModel[] = [];
  favorites: TagModel[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private tagService: TagService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  private _filter(value): TagModel[] {
    if (value.tag) { // TODO trouver une proprication
      value = value.tag;
    }
    const lowerCaseValue = value.toLowerCase();
    const result = this.allTags.filter(tag => tag.tag.toLowerCase().includes(lowerCaseValue))
    if (result.length === 1) {
      if (result[0].tag.toLowerCase().trim() === value.toLowerCase().trim()) { // pour avoir une valeur absolue
        this.addTag(result[0]);
        return [];
      }
    }
    return result;
  }

  ngOnInit() {
    this.tagService.getAll().subscribe(response => {
      this.allTags = response;
      this.favorites = this.allTags.filter(tag => tag.favorite === true);
    })
    // this.tagService.getAllFavorites().subscribe(response => {
    //   this.favorites = response;
    // })
    this.tagService.getAllTypes().subscribe(response => {
      this.allTypes = response;
    })
  }

  addOption(event: MatChipInputEvent): void {
    const value = event.value;

    if (value) {
      const result = this.allTags.filter(tag => tag.tag.toLowerCase().trim() === value.toLowerCase().trim());
      if (result.length === 1) {
        this.addTag(result[0]);
      }
    }
  }

  remove(tag: TagModel): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  select(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;

    if (value) {
      this.addTag(value);
    }
  }

  addTag(tag: TagModel) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.tagCtrl.setValue(null);
      this.tagInput.nativeElement.value = null;
    }
  }

  filterTagsByType(tags: TagModel[], type: TagTypeModel) {
    return tags.filter(tag => tag.type.id == type.id);
  }
}
