import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {AuthenticatedUserService} from "../service/authenticated-user.service";
import {UserModel} from "../models/user.model";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class RedirectAuthenticatedUserGuard implements CanActivateChild {

  constructor(private authenticatedUserService: AuthenticatedUserService, private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticatedUserService.authenticatedUser.pipe(
      map((authenticated: UserModel) => authenticated ? this.router.parseUrl('/') : true),
      catchError(() => of(true)) // if error catch, then go to sign in page
    );
  }
}
