import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataModel} from "../../models/data.model";
import {DataService} from "../../data.service";
import {SourceModel} from "../../models/source.model";

@Component({
  selector: 'ed-create-data',
  templateUrl: 'create-data.component.html'
})
export class CreateDataComponent   implements OnInit {

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {}

  newData: DataModel = new DataModel();

  firstFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required]
    });
    this.newData.sources.push(new SourceModel());
  }

  createData() {
    this.dataService.saveData(this.newData).subscribe(response => {
      this.newData = new DataModel();
    })
  }

  editTabOnType(index) {
    if (index == this.newData.sources.length - 1 && this.newData.sources[index].title !== undefined) {
      this.newData.sources.push(new SourceModel());
    }
    // else if (index !== 0 && index !== this.newData.sources.length -1 && this.newData.sources[index].title === "" && this.newData.sources[index].link === "") {
    //   this.newData.sources[index].title = "";
    //   this.newData.sources[index].link = "";
    //   this.newData.sources.splice(index, 1);
    // }
  }
}
