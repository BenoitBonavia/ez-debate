import {Component} from "@angular/core";
import {LoginDTO} from "../../models/auth.models";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationNavigationService} from "../../service/authentication-navigation.service";

@Component({
  selector: 'ed-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {

  constructor(private authenticationNavigationService: AuthenticationNavigationService, private snackBar: MatSnackBar) {}

  loginDTO = new LoginDTO();
  visiblePassword = false;

  isFilled() {
    return !(this.loginDTO.email && this.loginDTO.password);
  }

  signIn() {
    const onError = (response) => {
      if (response.status === 412) {
        this.snackBar.open("This user is not valid", 'Ok', {duration: 2000});
      } else {
        this.snackBar.open("Login Failure", 'Ok', {duration: 2000});
      }
    };

    this.authenticationNavigationService.signIn(this.loginDTO, onError);
  }
}
