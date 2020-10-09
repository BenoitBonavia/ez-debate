import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {TagModel} from "../../../models/tag.model";
import {TagService} from "../../../service/tag.service";

@Component({
  selector: 'ed-edit-tags-v2',
  templateUrl: './tags-v2.component.html',
  styleUrls: ['./tags-v2.component.scss']
})
export class TagsV2Component implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();

  filteredTags: Observable<TagModel[]>;

  tags: TagModel[] = [];

  allTags: TagModel[] = [];
  favorites: TagModel[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private tagService: TagService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit() {
    this.tagService.getAll().subscribe(response => {
      this.allTags = response;
    })
    this.tagService.getAllFavorites().subscribe(response => {
      this.favorites = response;
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value) {
      const result = this.allTags.filter(tag => tag.tag.toLowerCase().trim() === value.toLowerCase().trim());
      if (result.length === 1) {
        this.tags.push(result[0]);
        input.value = '';
      }
    }
  }

  addTag(tag: TagModel) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.tagCtrl.setValue('');
      this.fruitInput.nativeElement.value = '';
    }
  }

  remove(tag: TagModel): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): TagModel[] {
    if (!value) return [];
    const result = this.allTags.filter(tag => tag.tag.toLowerCase().includes(value.toLowerCase()))
    if (result.length === 1) {
      // if (result[0].tag.toLowerCase().trim() === value.toLowerCase().trim()) TODO pour avoir une valeur absolue
      this.addTag(result[0]);
      return [];
    }
    return result;
  }
}
