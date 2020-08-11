import {Component} from "@angular/core";
import {AuthenticationService} from "../auth/authentication.service";
import {Router} from "@angular/router";
import {AuthenticatedUserService} from "../auth/authenticated-user.service";
import {AuthenticationNavigationService} from "../auth/authentication-navigation.service";

@Component({
  selector: 'ed-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {

  constructor(private authenticationNavigationService: AuthenticationNavigationService, private router: Router) {
  }

  signOut() {
    this.authenticationNavigationService.signOut();
  }
}
