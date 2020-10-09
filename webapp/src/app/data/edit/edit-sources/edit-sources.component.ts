import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SourceModel} from "../../../models/source.model";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WaybackMachineService} from "../../../service/wayback-machine.service";

@Component({
  selector: 'ed-edit-sources',
  templateUrl: 'edit-sources.component.html'
})
export class EditSourcesComponent implements OnInit {

  @Input() sources: SourceModel[];
  @Output() sourcesChange = new EventEmitter<SourceModel[]>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private waybackMachineService: WaybackMachineService) {
  }

  ngOnInit() {
    this.sources.forEach(source => {
      this.waybackMachineService.getLinks(source.link).subscribe(response => {
        source.archives = response['archived_snapshots'];
      });
    })
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
    this.http.get('http://api.linkpreview.net/?key=5da039a275619ab6fe89d793b5a3c4153692779cb0680&q=' + event).subscribe(response => {
      this.sources[id].mTitle = response['title'];
      this.sources[id].mDescription = response['description'];
      this.sources[id].mImage = response['image'];
      this.sources[id].loaded = true;
      this.waybackMachineService.getLinks(this.sources[id].link).subscribe(response => {
        this.sources[id].archives = response['archived_snapshots'];
      });
    }, error => {
      this.sources.splice(id, 1);
      this.snackBar.open('This link isn\'t authorized', 'ok', {
        duration: 2000,
      });
    });
  }

  saveOnInternetArchive(sourceId: number) {
    this.waybackMachineService.save(this.sources[sourceId].link);
    this.autoRefreshAfterSave(sourceId)
    // this.waybackMachineService.getLinks(this.sources[sourceId].link);
  }

  getDateByTimestamp(timestamp) {
    let date = new Date();
    if (timestamp) {
      date.setFullYear(timestamp.substring(0, 4), timestamp.substring(4, 6) - 1, timestamp.substring(6, 8))
    }
    return date;
  }

  goToLink(url) {
    window.open(url);
  }

  refreshArchives(id) {
    this.waybackMachineService.getLinks(this.sources[id].link).subscribe(response => {
      this.sources[id].archives = response['archived_snapshots'];
    });
  }

  autoRefreshAfterSave(sourceId) {
    setTimeout(() => {
      this.refreshArchives(sourceId);
      if (!this.sources[sourceId]?.archives?.closest) {
        this.autoRefreshAfterSave(sourceId);
      }
    }, 1000);
  }
}
