import {Component} from "@angular/core";
import {LoginDTO} from "../../models/auth.models";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationNavigationService} from "../authentication-navigation.service";

@Component({
  selector: 'ed-login',
  templateUrl: 'login.component.html'
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
        this.snackBar.open("This user is not valid", null, {duration: 2000});
      } else {
        this.snackBar.open("Login Failure", null, {duration: 2000});
      }
    };

    this.authenticationNavigationService.signIn(this.loginDTO, onError);
  }
}
