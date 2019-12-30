import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'ed-resend-token',
  templateUrl: 'resend-token.component.html'
})
export class ResendTokenComponent implements OnInit {

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  private token: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  resendToken() {
    this.authService.resendToken(this.token).subscribe(response => {
      this.router.navigate(['/resend-token/' + response.token]);
    });
  }
}
