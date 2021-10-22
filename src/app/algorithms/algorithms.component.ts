import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.sass']
})
export class AlgorithmsComponent implements OnInit {

  public screenWidth: any;
  public screenHeight: any;
  constructor() { }

  ngOnInit() {
    this.screenWidth = window.innerWidth * 90;
    this.screenHeight = window.innerHeight * 90;
  }



}
