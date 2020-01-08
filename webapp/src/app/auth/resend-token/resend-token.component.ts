import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ed-resend-token',
  templateUrl: 'resend-token.component.html'
})
export class ResendTokenComponent implements OnInit {

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
  }

  private token: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  resendToken() {
    this.authService.resendToken(this.token).subscribe(response => {
      if (response === null) {
        let snackBarRef = this.snackBar.open("The token you're trying to refresh doesn't seems to exist", 'Register', {
          duration: 3000
        });
        snackBarRef.onAction().subscribe(response => {
          this.router.navigate(["/register"]);
        });
        return;
      }
      this.router.navigate(['/resend-token/' + response.token]);
    });
  }
}
