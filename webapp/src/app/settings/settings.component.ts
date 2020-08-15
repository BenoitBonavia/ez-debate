import {Component, OnInit} from "@angular/core";
import {ThemeService} from "../theme.service";

@Component({
  selector: 'ed-settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

  constructor(private themeService: ThemeService) {

  }

  currentTheme: string;

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  selectTheme(event) {
    this.themeService.setTheme(event.value);
    this.currentTheme = event.value;
  }
}
