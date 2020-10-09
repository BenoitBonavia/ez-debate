import {Injectable} from "@angular/core";
import {OverlayContainer} from "@angular/cdk/overlay";


@Injectable()
export class ThemeService {

  private currentTheme: string

  constructor(private overlayContainer: OverlayContainer) {
    this.currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';
    this.overlayContainer.getContainerElement().classList.add('dark-theme');
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      this.overlayContainer.getContainerElement().classList.add('light-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('light-theme');
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    }
  }

  isCurrentTheme(theme: string) {
    return this.currentTheme === theme;
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}
