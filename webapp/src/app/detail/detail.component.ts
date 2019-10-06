import {Component} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DataService} from "../models/service/data.service";
import {DataModel} from "../models/data.model";

@Component({
  selector: 'detail',
  templateUrl: 'detail.component.html',
})
export class DetailComponent {

  private data: DataModel;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      this.dataService.getDataDetail(params['id']).subscribe(response => {
        this.data = response;
      })
    })
  }
}
