import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegisterDTO, VerificationToken} from "../models/auth.models";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {

  }

  register(registerDTO: RegisterDTO): Observable<VerificationToken> {
    return this.httpClient.post('/api/register', registerDTO) as Observable<VerificationToken>;
  }

  validateToken(token: string) {
    return this.httpClient.get('/api/register/registrationConfirm/' + token);
  }

  resendToken(token: string): Observable<VerificationToken> {
    return this.httpClient.post('/api/register/refreshToken/', token) as Observable<VerificationToken>;
  }
}
