import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  public innerWidth: number = 0;
  title = 'Projects'
  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth * .9;
  }
}
