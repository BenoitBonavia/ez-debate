import {Component, OnInit} from "@angular/core";
import {AuthenticatedUserService} from "../auth/authenticated-user.service";
import {UserModel} from "../models/user.model";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'ed-new-data-button',
  templateUrl: 'new-data-button.component.html',
  styleUrls: ['new-data-button.component.scss']
})
export class NewDataButtonComponent implements OnInit {


  constructor(private authenticatedUserService: AuthenticatedUserService) {
  }

  ngOnInit(): void {
  }

  isUserAuthenticatedAdmin() {
    return this.authenticatedUserService.isUserAuthenticatedAdmin();
  }
}
