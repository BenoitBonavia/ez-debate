import {Component, EventEmitter, Output} from "@angular/core";
import {AuthenticationNavigationService} from "../../../service/authentication-navigation.service";
import {AuthenticatedUserService} from "../../../service/authenticated-user.service";

@Component({
  selector: 'ed-mobile-menu-links',
  templateUrl: 'mobile-menu-links.component.html',
  styleUrls: ['mobile-menu-links.component.scss']
})
export class MobileMenuLinksComponent {

  @Output() closeMenuButton = new EventEmitter();

  constructor(private authenticationNavigationService: AuthenticationNavigationService, private authenticatedUserService: AuthenticatedUserService) {

  }

  signOut() {
    this.authenticationNavigationService.signOut();
  }

  closeMenu() {
    this.closeMenuButton.emit();
  }

  isAdmin() {
    return this.authenticatedUserService.isUserAuthenticatedAdmin();
  }

  isConnected() {
    return this.authenticatedUserService.isAuthenticated();
  }
}
