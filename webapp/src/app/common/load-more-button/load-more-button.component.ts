import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'ed-load-more-button',
  templateUrl: 'load-more-button.component.html',
  styleUrls: ['load-more-button.component.scss']
})
export class LoadMoreButtonComponent {

  @Input() displayLoading: boolean;
  @Output() clickButton = new EventEmitter()

}
