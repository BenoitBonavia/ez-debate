import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<UserModel[]> {
    return this.httpClient.get('/api/users') as Observable<UserModel[]>;
  }

  saveUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post('/api/users', user) as Observable<UserModel>;
  }
}
