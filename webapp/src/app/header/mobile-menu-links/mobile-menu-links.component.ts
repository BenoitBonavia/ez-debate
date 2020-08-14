import {Component} from "@angular/core";
import {AuthenticationNavigationService} from "../../auth/authentication-navigation.service";

@Component({
  selector: 'ed-mobile-menu-links',
  templateUrl: 'mobile-menu-links.component.html',
  styleUrls: ['mobile-menu-links.component.scss']
})
export class MobileMenuLinksComponent {

  constructor(private authenticationNavigationService: AuthenticationNavigationService) {

  }

  signOut() {
    this.authenticationNavigationService.signOut();
  }
}
