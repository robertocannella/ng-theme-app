import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.sass']
})
export class NewPostFormComponent implements OnInit {

  constructor(public overlayContainer: OverlayContainer) {
      console.log(this.overlayContainer.getContainerElement().classList)
  }
  

  ngOnInit(): void {
  }
  
  toggleTheme(overlayContainer: OverlayContainer) {
    let classList = overlayContainer.getContainerElement().classList;
    (classList.contains('dark-theme')) ? null : classList.toggle('dark-theme');
  }

}
