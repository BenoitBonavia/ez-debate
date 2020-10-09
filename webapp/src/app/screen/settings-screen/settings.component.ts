import {Component, OnInit} from "@angular/core";
import {ThemeService} from "../../theme.service";
import {TagModel} from "../../models/tag.model";
import {UserService} from "../../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticatedUserService} from "../../service/authenticated-user.service";

@Component({
  selector: 'ed-settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

  tags: TagModel[] = [];
  editHomePref = false;

  constructor(private themeService: ThemeService, private userService: UserService, private matSnackBar: MatSnackBar, private authenticatedUserService: AuthenticatedUserService) {

  }

  currentTheme: string;

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.authenticatedUserService.authenticatedUser.subscribe(response => {
      this.tags = response.prefHome;
    });
  }

  selectTheme(event) {
    this.themeService.setTheme(event.value);
    this.currentTheme = event.value;
  }

  saveHomePref() {
    this.userService.setPrefHome(this.tags).subscribe(() => {
      this.matSnackBar.open("Home preferences saved !", 'Ok', {duration: 2000});
      this.authenticatedUserService.storeAuthenticatedUserAndRoles();
    });
  }
}
