import {Component, OnInit} from "@angular/core";
import {UsersService} from "../service/users.service";
import {UserModel} from "../models/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ed-users-administration',
  templateUrl: 'users-administration.component.html'
})
export class UsersAdministrationComponent implements OnInit {

  constructor(private usersService: UsersService, private snackBar: MatSnackBar) {

  }

  users: UserModel[];
  displayedColumns: string[] = ['id', 'firstname', "lastname", 'email', 'valid', 'ban', 'role'];

  ngOnInit() {
    this.usersService.getAll().subscribe(response => {
      this.users = response;
    })
  }

  saveUser(user: UserModel) {
    this.usersService.saveUser(user).subscribe(response => {
      this.users.indexOf(user)
      this.users[this.users.indexOf(user)] = response;
      this.snackBar.open('The changes have been saved', 'Ok', {duration: 2000})
    })
  }
}
