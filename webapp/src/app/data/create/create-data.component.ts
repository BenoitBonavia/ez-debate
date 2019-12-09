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

  newData: DataModel = new DataModel();

  firstFormGroup: FormGroup;

  tags: TagModel[];

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required]
    });
  }

  createData() {
    this.dataService.saveData(this.newData).subscribe(response => {
      this.newData = new DataModel();
      this.openSnackBar("New data created", null);
    })
    console.log(this.newData);
    this.newData = new DataModel();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
