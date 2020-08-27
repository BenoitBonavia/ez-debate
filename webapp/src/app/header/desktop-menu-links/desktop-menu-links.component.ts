import {Component} from "@angular/core";
import {AuthenticatedUserService} from "../../service/authenticated-user.service";
import {AuthenticationNavigationService} from "../../service/authentication-navigation.service";

@Component({
  selector: 'ed-desktop-menu-links',
  templateUrl: 'desktop-menu-links.component.html'
})
export class DesktopMenuLinksComponent {

  constructor(private authenticatedUserService: AuthenticatedUserService, private authenticationNavigationService: AuthenticationNavigationService) {

  }

  isAdmin() {
    return this.authenticatedUserService.isUserAuthenticatedAdmin();
  }

  signOut() {
    this.authenticationNavigationService.signOut();
  }
}
