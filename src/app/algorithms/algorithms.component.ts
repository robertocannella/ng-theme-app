import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';


@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.sass']
})
export class AlgorithmsComponent implements OnInit {

  public innerWidth: number = 0;
  linearRegression: string = '\\hat y=(w_{0}x_{0})+(w_{1}x_{1})+...+(w_{p}x_{p})+b';
  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth * .9;
  }



}
