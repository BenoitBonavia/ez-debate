import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SourceModel} from "../../../models/source.model";
import {getLinkPreview} from 'link-preview-js';
import {fromPromise} from "rxjs/internal-compatibility";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ed-edit-sources',
  templateUrl: 'edit-sources.component.html'
})
export class EditSourcesComponent {

  @Input() sources: SourceModel[];
  @Output() sourcesChange = new EventEmitter<SourceModel[]>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  editTabOnType(index) {
    if (this.sources[index].title !== undefined) {
      this.sourcesChange.emit(this.sources);
    }
  }

  removeSource(index) {
    this.sources.splice(index, 1);
    this.sourcesChange.emit(this.sources);
  }

  addNewSource() {
    if (this.sources.length === 0 || this.sources[this.sources.length - 1].link) {
      this.sources.push(new SourceModel());
    }
  }

  getMetaData(id, event) {
    if (event) {
      this.sources[id].loaded = false;
    }
    console.log(this.sources[id]);
    this.http.get('http://api.linkpreview.net/?key=5da039a275619ab6fe89d793b5a3c4153692779cb0680&q=' + event).subscribe(response => {
      this.sources[id].mTitle = response['title'];
      this.sources[id].mDescription = response['description'];
      this.sources[id].mImage = response['image'];
      this.sources[id].loaded = true;
    }, error => {
      this.sources.splice(id, 1);
      this.snackBar.open('This link isn\'t authorized', 'ok', {
        duration: 2000,
      });
    });
  }
}
