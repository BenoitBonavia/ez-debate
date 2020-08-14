import {Component, EventEmitter, Output} from "@angular/core";
import {AuthenticationNavigationService} from "../auth/authentication-navigation.service";

@Component({
  selector: 'ed-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {

  @Output() openMenuButton = new EventEmitter();

  constructor(private authenticationNavigationService: AuthenticationNavigationService) {

  }

  signOut() {
    this.authenticationNavigationService.signOut();
  }

  openMenu() {
    this.openMenuButton.emit();
  }
}
