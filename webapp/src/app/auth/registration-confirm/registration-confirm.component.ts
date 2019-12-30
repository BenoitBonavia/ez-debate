import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Status} from "tslint/lib/runner";

enum StatusCode {
  TOKEN_ACTIVATED ,
  TOKEN_EXPIRED ,
  TOKEN_ALREADY_ACTIVATED ,
  TOKEN_DOES_NOT_EXIST
}

@Component({
  selector: 'ed-registration-confirm',
  templateUrl: 'registration-confirm.component.html'
})
export class RegistrationConfirmComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  status: string = null;
  token: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: ParamMap) => {
      this.token = params['token'];
      this.authService.validateToken(this.token).subscribe(response => {
        this.status = response.toString();
        switch (response) {
          case "TOKEN_ACTIVATED": {
            this.router.navigate(['/login']);
            break;
          }
          case "TOKEN_ALREADY_ACTIVATED": {
            this.router.navigate(['/login']);
            break;
          }
          case "TOKEN_EXPIRED": {
            console.log("expired");
            break;
          }
          case "TOKEN_DOES_NOT_EXIST": {
            console.log("doesn't exist");
            break;
          }
        }
      });
    })
  }

}
