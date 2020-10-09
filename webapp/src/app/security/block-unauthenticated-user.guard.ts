import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {AuthenticatedUserService} from "../service/authenticated-user.service";
import {UserModel} from "../models/user.model";
import {catchError, filter, map} from "rxjs/operators";
import {AuthenticationNavigationService} from "../service/authentication-navigation.service";

@Injectable()
export class BlockUnauthenticatedUserGuard implements CanActivateChild {

  constructor(private authenticatedUserService: AuthenticatedUserService, private authenticationNavigationService: AuthenticationNavigationService, private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticatedUserService.authenticatedUser.pipe(
      filter(authenticated => authenticated !== undefined),
      map((authenticated: UserModel) => {
        if (!authenticated || !authenticated.role) {
          return this.router.parseUrl('/login');
        }
        return true;
      }),
      catchError(error => {
        if (error.status === 401) {
          this.authenticationNavigationService.redirectUrl = state.url;
          this.authenticatedUserService.removeAuthenticatedUserAndRole();
          return of(this.router.parseUrl('/login'));
        }
        return of(false);
      })
    );
  }
}
