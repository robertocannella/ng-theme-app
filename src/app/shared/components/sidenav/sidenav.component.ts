import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {

  themeColor: 'primary' | 'accent' | 'warn' = 'primary';
  isDark = false;
  isOpen = false;
  brand = "Roberto Cannella";

  constructor(private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.overlayContainer.getContainerElement().classList.toggle('dark-theme');
  }

  toggleSideNav() {
    this.isOpen = !this.isOpen;
  }
  closeSideNav() {
    this.isOpen = false;
  }
}
