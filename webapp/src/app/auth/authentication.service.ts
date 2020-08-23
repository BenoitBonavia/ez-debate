import {LoginDTO, RegisterDTO} from "../models/auth.models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<UserModel> {
    return this.http.get('/api/authentication') as Observable<UserModel>
  }

  signIn(loginDTO: LoginDTO) {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    let body = 'username=' + loginDTO.email + '&password=' + loginDTO.password;
    return this.http.post('/api/login', body, {headers: header, responseType: 'text'});
  }

  signUp(signupDTO: RegisterDTO) {
    return this.http.post('/api/authentication/register', signupDTO);
  }

  signOut() {
    return this.http.get('/api/logout', {responseType: 'text'});
  }
}
