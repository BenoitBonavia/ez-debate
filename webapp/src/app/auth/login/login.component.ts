import {Component} from "@angular/core";
import {LoginDTO} from "../../models/auth.models";

@Component({
  selector: 'ed-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  constructor() {}

  loginDTO = new LoginDTO();

  isFilled() {
    return !(this.loginDTO.email && this.loginDTO.password);
  }
}
