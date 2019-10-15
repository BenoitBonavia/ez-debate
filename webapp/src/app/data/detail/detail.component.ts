import {ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DataService} from "../../service/data.service";
import {DataModel} from "../../models/data.model";


export enum HoverArea {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  TAGS = 'tags',
  TEXT = 'text',
  SOURCE = 'source'
}

export enum EditableArea {
  TITLE_SUBTITLE = 'title&subtitle',
  TAGS = 'tags',
  TEXT = 'text',
  SOURCE = 'source'
}

@Component({
  selector: 'detail',
  templateUrl: 'detail.component.html'
})
export class DetailComponent {

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

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {

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
    this.loadingArea = val;
    this.holding = event;
    if (event === this.EDIT_TIME) {
      this.setEditableArea(val);
      this.holding = 0;
    }
  }
}
