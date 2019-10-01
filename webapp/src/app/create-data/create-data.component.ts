import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ed-create-data',
  templateUrl: 'create-data.component.html',
  styleUrls: ['create-data.component.scss']
})
export class CreateDataComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {

  }
}
