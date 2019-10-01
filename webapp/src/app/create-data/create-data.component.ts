import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataModel} from "../data/data.model";
import {DataService} from "../data/data.service";

@Component({
  selector: 'ed-create-data',
  templateUrl: 'create-data.component.html',
  styleUrls: ['create-data.component.scss']
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
  }

  createData() {
    this.dataService.saveData(this.newData).subscribe(response => {
      this.newData = new DataModel();
    })
  }
}
