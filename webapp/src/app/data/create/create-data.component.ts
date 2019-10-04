import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataModel} from "../../models/data.model";
import {DataService} from "../../models/service/data.service";
import {SourceModel} from "../../models/source.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IconService} from "../../models/service/icon.service";
import {IconModel} from "../../models/icon.model";
import {VideoModel} from "../../models/video.model";

@Component({
  selector: 'ed-create-data',
  templateUrl: 'create-data.component.html',
  styleUrls: ['create-data.component.scss']
})
export class CreateDataComponent   implements OnInit {

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private iconService: IconService, private snackBar: MatSnackBar) {}

  icons: IconModel[];

  newData: DataModel = new DataModel();

  firstFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required]
    });
    this.iconService.getAll().subscribe(response => {
      this.icons = response;
    });
    this.newData.sources.push(new SourceModel());
    this.newData.videos.push(new VideoModel());
  }

  createData() {
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
}
