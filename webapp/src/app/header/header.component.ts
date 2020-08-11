import {Component} from "@angular/core";
import {Router} from "@angular/router";
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
