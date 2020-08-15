import { Component } from '@angular/core';
import {ThemeService} from "./theme.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ezDebate';

  constructor(private themeService: ThemeService, private snackBar: MatSnackBar) {

  }

  isCurrentlyDarkTheme() {
    return this.themeService.isCurrentTheme('dark');
  }

  consoleLog() {
    console.log('Blbalbalbalbal');
    this.snackBar.open("message");
  }
}
