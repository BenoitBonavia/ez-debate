import {Injectable} from "@angular/core";


@Injectable()
export class ThemeService {

  constructor() {
  }

  private currentTheme: string = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';

  setTheme(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  isCurrentTheme(theme: string) {
    return this.currentTheme === theme;
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}
