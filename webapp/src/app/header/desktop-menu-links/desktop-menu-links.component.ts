import {Component} from "@angular/core";
import {AuthenticatedUserService} from "../../auth/authenticated-user.service";

@Component({
  selector: 'ed-desktop-menu-links',
  templateUrl: 'desktop-menu-links.component.html'
})
export class DesktopMenuLinksComponent {

  constructor(private authenticatedUserService: AuthenticatedUserService) {

  }

  isAdmin() {
    return this.authenticatedUserService.isUserAuthenticatedAdmin();
  }
}
