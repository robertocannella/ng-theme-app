import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass']
})
export class StatisticsComponent implements OnInit {
  equation: string = '\\sum_{i=1}^nx_i';
  pathogrean: string = 'x^2 + y^2 = z^2'
  einstein: string = 'E=mc^2'
  covarianceEquation: string = 'Cov(x,y)=\\frac{\\sum_{i=1}^{n}(x_{i}-\\bar{x})(y_{i}-\\bar{y})}{n-1}';
  //'Cov(x,y)=\\frac{\\sum_{i=1}^{N}(x_{i}-\\bar{x})(y_{i}-\\bar{y})}{N-1}$';
  constructor() { }

  ngOnInit(): void {
  }

}
