import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataModel} from "../../models/data.model";
import {DataService} from "../../service/data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IconService} from "../../service/icon.service";
import {TagModel} from "../../models/tag.model";

@Component({
  selector: 'ed-create-data',
  templateUrl: 'create-data.component.html',
  styleUrls: ['create-data.component.scss']
})
export class CreateDataComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private iconService: IconService, private snackBar: MatSnackBar) {
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
    this.dataService.saveData(this.newData).subscribe(() => {
      this.newData = new DataModel();
      this.snackBar.open("New data created", null, {duration: 2000});
      this.newData = new DataModel();
    }, error => {
      this.snackBar.open('Error during the creation', null, {duration: 2000});
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
