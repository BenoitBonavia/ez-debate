import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IconModel} from "../../../models/icon.model";
import {IconService} from "../../../service/icon.service";

@Component({
  selector: 'ed-edit-icon',
  templateUrl: 'edit-icon.component.html'
})
export class EditIconComponent implements OnInit {

  @Input() icon: string;
  @Output() iconChange = new EventEmitter<string>();

  icons: IconModel[];

  constructor(private iconService: IconService) {

  }

  ngOnInit(): void {
    this.iconService.getAll().subscribe(response => {
      this.icons = response;
    });
  }

  saveIcon() {
    this.iconService.saveIcon(new IconModel(this.icon)).subscribe(response => {
      this.icons.push(response);
    });
  }

  setIcon(icon) {
    this.icon = icon.icon;
    this.iconChange.emit(this.icon);
  }

  refresh() {
    this.iconChange.emit(this.icon);
  }
}
