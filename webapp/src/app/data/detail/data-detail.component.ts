import {Component, ElementRef, ViewChild} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {DataModel} from "../../models/data.model";


export enum HoverArea {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  TAGS = 'tags',
  TEXT = 'text',
  SOURCE = 'source',
  VIDEO = 'video'
}

export enum EditableArea {
  TITLE_SUBTITLE = 'title&subtitle',
  TAGS = 'tags',
  TEXT = 'text',
  SOURCE = 'source',
  VIDEO = 'video'
}

@Component({
  selector: 'detail',
  templateUrl: 'data-detail.component.html'
})
export class DataDetailComponent {

  EDIT_TIME: number = 1000;

  HoverArea: typeof HoverArea = HoverArea;
  EditableArea: typeof EditableArea = EditableArea;
  data: DataModel;
  tempData: DataModel;
  hoverArea: string = null;
  editableArea: string = null;
  loadingArea: string = null;

  holding = 0;

  @ViewChild("verticalVideoCarouselContainer", {static: false}) verticalVideoCarouselContainer: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      this.dataService.getDataDetail(params['id']).subscribe(response => {
        this.data = response;
        this.tempData = response;
      })
    })
  }

  setHover(val) {
    this.hoverArea = val;
  }

  setEditableArea(val) {
    this.editableArea = val;
    this.tempData = this.data;
  }

  cancel() {
    this.editableArea = null;
    this.tempData = this.data;
  }

  saveData() {
    this.dataService.saveData(this.data).subscribe(response => {
      this.data = response;
      this.tempData = this.data;
      this.editableArea = null;
    })
  }

  holdToEdit(event, val) {
    console.log(event + ' ' + val);
    this.loadingArea = val;
    this.holding = event;
    if (event === this.EDIT_TIME) {
      this.setEditableArea(val);
      this.holding = 0;
    }
  }

  delete() {
    this.dataService.deleteData(this.data.id).subscribe(() => {
      this.router.navigate(["/home"]);
    })
  }
}
