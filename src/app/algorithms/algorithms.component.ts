import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.sass']
})
export class AlgorithmsComponent implements OnInit {

  public innerWidth: number = 0;

  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth * .9;
  }



}
