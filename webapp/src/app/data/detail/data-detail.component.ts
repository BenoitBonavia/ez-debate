import {Component, ElementRef, ViewChild} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {DataService} from "../../service/data.service";
import {DataModel} from "../../models/data.model";
import {FloatingButtonsService} from "../../floating-buttons/floating-buttons.service";

@Component({
  selector: 'detail',
  templateUrl: 'data-detail.component.html'
})
export class DataDetailComponent {

  EDIT_TIME: number = 1000;

  data: DataModel = new DataModel();
  dataSave: DataModel = new DataModel();

  holding = 0;

  editMod: boolean;

  @ViewChild("verticalVideoCarouselContainer", {static: false}) verticalVideoCarouselContainer: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private router: Router, private floatingButtonsService: FloatingButtonsService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      this.dataService.getDataDetail(params['id']).subscribe(response => {
        this.data = response;
      })
    })
    this.floatingButtonsService.editButtonValue.subscribe(response => {
      this.editMod = response;
      if (this.data && this.editMod) {
        Object.assign(this.dataSave, this.data);
      } else {
        Object.assign(this.data, this.dataSave);
      }
    });
  }

  saveData() {
    this.dataService.saveData(this.data).subscribe(response => {
      this.data = response;
    })
  }

  delete() {
    this.dataService.deleteData(this.data.id).subscribe(() => {
      this.router.navigate(["/home"]);
    })
  }
}
