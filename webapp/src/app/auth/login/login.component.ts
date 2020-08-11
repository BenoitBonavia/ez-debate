import {Component} from "@angular/core";
import {LoginDTO} from "../../models/auth.models";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../authentication.service";
import {AuthenticationNavigationService} from "../authentication-navigation.service";

@Component({
  selector: 'ed-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  constructor(private authenticationNavigationService: AuthenticationNavigationService, private snackBar: MatSnackBar) {}

  loginDTO = new LoginDTO();
  visiblePassword = false;

  isFilled() {
    return !(this.loginDTO.email && this.loginDTO.password);
  }

  signIn() {
    const onError = (response) => {
      if (response.status === 412) {
        this.snackBar.open("This user is not valid");
      } else {
        this.snackBar.open("Login Failure");
      }
    };

    this.authenticationNavigationService.signIn(this.loginDTO, onError);
  }
}
