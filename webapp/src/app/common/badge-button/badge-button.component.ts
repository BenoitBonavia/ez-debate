import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'ed-badge-button',
  templateUrl: 'badge-button.component.html',
  styleUrls: ['badge-button.component.scss']
})
export class BadgeButtonComponent {

  @Input() icon: string = 'edit';
  @Output() onButtonClick = new EventEmitter();

  clickCallBack() {
    this.onButtonClick.emit();
  }
}
