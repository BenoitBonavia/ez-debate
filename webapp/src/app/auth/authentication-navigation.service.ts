import {LoginDTO} from "../models/auth.models";
import {AuthenticationService} from "./authentication.service";
import {AuthenticatedUserService} from "./authenticated-user.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthenticationNavigationService {

  redirectUrl = '/';

  constructor(private router: Router, private authenticationService: AuthenticationService, private authenticatedUserService: AuthenticatedUserService) {
  }

  signIn(loginDTO: LoginDTO, onError: (response) => void) {
    this.authenticationService.signIn(loginDTO).subscribe(() => {
      this.authenticatedUserService.storeAuthenticatedUserAndRoles();

      this.authenticatedUserService.authenticatedUser.subscribe((authenticated) => {
        if (this.authenticatedUserService.isUserAuthenticated(authenticated)) {
          this.router.navigateByUrl(this.redirectUrl)
            .then(() => {})
            .catch(this.onNavigationRejected());
        }
      })
    }, onError)
  }

  private onNavigationRejected() {
    return e => {
      console.error(e);
      this.router.navigate(['/']);
    }
  }
}
