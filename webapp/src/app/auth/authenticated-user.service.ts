import {AuthenticationService} from "./authentication.service";
import {UserModel} from "../models/user.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";

const noAuthenticatedUser = undefined;

@Injectable()
export class AuthenticatedUserService {

  private authenticatedUserSource: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(noAuthenticatedUser);
  public readonly authenticatedUser: Observable<UserModel> = this.authenticatedUserSource.asObservable();

  constructor(private authHttpService: AuthenticationService) {
    this.storeAuthenticatedUserAndRoles();
  }

  storeAuthenticatedUserAndRoles() {
    this.authHttpService.getUser().subscribe((user) => {
      this.authenticatedUserSource.next(user);
    }, error => console.error('probably network error', error));
  }

  isUserAuthenticated(authenticatedUser: UserModel): boolean {
    return authenticatedUser != null && authenticatedUser.email != null && authenticatedUser.role != null;
  }

  isAuthenticated() {
    return this.authenticatedUserSource.value;
  }

  removeAuthenticatedUserAndRole() {
    this.authenticatedUserSource.next(noAuthenticatedUser);
  }

  isUserAuthenticatedAdmin() {
    return this.authenticatedUserSource?.value?.role === 'ROLE_ADMIN';
  }
}
