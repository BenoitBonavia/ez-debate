import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {TagModel} from "../models/tag.model";
import {AuthenticatedUserService} from "./authenticated-user.service";

@Injectable()
export class UserService {

  private currentUser: UserModel

  constructor(private httpClient: HttpClient, private authenticatedUserService: AuthenticatedUserService) {
    this.authenticatedUserService.authenticatedUser.subscribe(response => {
      this.currentUser = response;
    })
  }

  getAll(): Observable<UserModel[]> {
    return this.httpClient.get('/api/user') as Observable<UserModel[]>;
  }

  saveUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post('/api/user', user) as Observable<UserModel>;
  }

  setPrefHome(tags: TagModel[]): Observable<UserModel> {
    return this.httpClient.post('/api/user/pref/id=' + this.currentUser.id, tags) as Observable<UserModel>;
  }
}
