import {ChangeDetectorRef, Component, ElementRef, ViewChild} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DataService} from "../../service/data.service";
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'detail',
  templateUrl: 'detail.component.html'
})
export class DetailComponent {

  data: DataModel;
  hoverArea: string = null;

  @ViewChild("verticalVideoCarouselContainer", {static: false}) verticalVideoCarouselContainer: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      this.dataService.getDataDetail(params['id']).subscribe(response => {
        this.data = response;
      })
    })
  }

  setHover(val) {
    this.hoverArea = val;
  }
}
