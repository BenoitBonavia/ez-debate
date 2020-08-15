import {Injectable} from "@angular/core";


@Injectable()
export class ThemeService {

  private currentTheme: string = 'dark';

  setTheme(theme: string) {
    this.currentTheme = theme;
  }

  isCurrentTheme(theme: string) {
    return this.currentTheme === theme;
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}
