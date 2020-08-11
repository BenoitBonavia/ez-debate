import {Component} from "@angular/core";
import {AuthenticationService} from "../auth/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ed-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  signOut() {
    this.authenticationService.signOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
