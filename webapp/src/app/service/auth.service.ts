import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegisterDTO} from "../models/auth.models";

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {

  }

  register(registerDTO: RegisterDTO) {
    return this.httpClient.post('/api/register', registerDTO);
  }

  validateToken(token: string) {
    return this.httpClient.get('/api/register/registrationConfirm/' + token);
  }
}
