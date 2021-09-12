import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {

  themeColor: 'primary' | 'accent' | 'warn' = 'primary';
  isDark = true;


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
