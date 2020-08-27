import {Component, OnInit} from "@angular/core";
import {AuthenticatedUserService} from "../service/authenticated-user.service";
import {UserModel} from "../models/user.model";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {FloatingButtonsService} from "./floating-buttons.service";

@Component({
  selector: 'ed-new-data-button',
  templateUrl: 'floating-buttons.component.html',
  styleUrls: ['floating-buttons.component.scss']
})
export class FloatingButtonsComponent implements OnInit {

  isInEditMod: boolean;


  constructor(private authenticatedUserService: AuthenticatedUserService, private floatingButtons: FloatingButtonsService, public router: Router) {
  }

  ngOnInit(): void {
    this.floatingButtons.editButtonValue.asObservable().subscribe(response => {
      this.isInEditMod = response;
    })
  }

  isUserAuthenticatedAdmin() {
    return this.authenticatedUserService.isUserAuthenticatedAdmin();
  }

  toggletEditButtonValue() {
    this.floatingButtons.toggleEditButtonValue();
  }

  save() {
    this.floatingButtons.saveButtonEmitter.next();
  }

  delete() {
    this.floatingButtons.deleteButtonEmitter.next();
  }
}
