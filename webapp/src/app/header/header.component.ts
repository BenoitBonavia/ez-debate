import {Component, EventEmitter, Output} from "@angular/core";
import {AuthenticationNavigationService} from "../service/authentication-navigation.service";

@Component({
  selector: 'ed-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {

  @Output() openMenuButton = new EventEmitter();

  constructor() {

  }

  openMenu() {
    this.openMenuButton.emit();
  }
}
