import {Component} from "@angular/core";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'ed-resend-token',
  templateUrl: 'resend-token.component.html'
})
export class ResendTokenComponent {

  constructor(private authService: AuthService) {
  }

  resendToken() {

  }
}
