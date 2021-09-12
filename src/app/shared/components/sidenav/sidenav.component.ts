import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { faCoffee, faBook, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { faStackOverflow, faGithub, faMedium, faGit } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {

  themeColor: 'primary' | 'accent' | 'warn' = 'primary';
  isDark = true;
  faCoffee = faCoffee;
  faGitHub = faGithub;
  faMedium = faMedium;
  faGit = faGit;
  faStackOverflow = faStackOverflow;
  faBook = faBook;
  faProjectDiagram = faProjectDiagram;

  constructor(private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
  }
  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (!this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('light-theme');
      
    } else {
      this.overlayContainer.getContainerElement().classList.remove('light-theme');
    }
      
  }
}
