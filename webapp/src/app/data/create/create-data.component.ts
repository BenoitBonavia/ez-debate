import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataModel} from "../../models/data.model";
import {DataService} from "../../service/data.service";
import {SourceModel} from "../../models/source.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IconService} from "../../service/icon.service";
import {IconModel} from "../../models/icon.model";
import {VideoModel} from "../../models/video.model";
import {TagModel} from "../../models/tag.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Tag} from "@angular/compiler/src/i18n/serializers/xml_helper";
import {TagService} from "../../service/tag.service";

@Component({
  selector: 'ed-create-data',
  templateUrl: 'create-data.component.html',
  styleUrls: ['create-data.component.scss']
})
export class CreateDataComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private iconService: IconService, private snackBar: MatSnackBar, private tagService: TagService) {
  }

  icons: IconModel[];

  newData: DataModel = new DataModel();

  firstFormGroup: FormGroup;

  // Paramétrage du champs des tags
  selectable: boolean = true;
  removable: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur: boolean = true;

  tags: TagModel[];

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required]
    });
    this.iconService.getAll().subscribe(response => {
      this.icons = response;
    });
    this.tagService.getAll().subscribe(response => {
      this.tags = response;
    });
    this.newData.sources.push(new SourceModel());
    this.newData.videos.push(new VideoModel());
  }

  createData() {
    this.newData.videos.splice(-1, 1);
    this.newData.sources.splice(-1, 1);
    this.dataService.saveData(this.newData).subscribe(response => {
      this.newData = new DataModel();
      this.openSnackBar("New data created", null);
    })
  }

  editTabOnType(index) {
    if (index == this.newData.sources.length - 1 && this.newData.sources[index].title !== undefined) {
      this.newData.sources.push(new SourceModel());
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  saveIcon() {
    this.iconService.saveIcon(new IconModel(this.newData.icon)).subscribe(response => {
      this.icons.push(response);
    });
  }

  setIcon(icon) {
    this.newData.icon = icon.icon;
  }

  addVideoLink(index) {
    if (index == this.newData.videos.length - 1 && this.newData.videos[index].title !== undefined) {
      this.newData.videos.push(new VideoModel());
    }
  }

  remove(tagId: number): void {
    this.newData.tags.splice(tagId, 1);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (value != "") {
      let tag = new TagModel();
      tag.tag = value;
      this.tagService.saveTag(tag).subscribe(response => {
        this.newData.tags.push(response);
      })
    }
    if (input) {
      input.value = '';
    }
  }
}
