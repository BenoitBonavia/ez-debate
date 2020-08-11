import {Component} from "@angular/core";
import {AuthenticationNavigationService} from "../auth/authentication-navigation.service";

@Component({
  selector: 'ed-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {

  constructor(private authenticationNavigationService: AuthenticationNavigationService) {

  }

  signOut() {
    this.authenticationNavigationService.signOut();
  }
}
