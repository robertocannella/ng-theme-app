import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass']
})
export class StatisticsComponent implements OnInit {
  equation: string = '\\sum_{i=1}^nx_i';
  pathogrean: string = 'x^2 + y^2 = z^2';
  einstein: string = 'E=mc^2';
  rSquared: string = 'R^2=\\frac{Var(mean)-Var(line)}{Var(mean)}';
  covarianceEquation: string = 'Cov(x,y)=\\frac{\\sum_{i=1}^{n}(x_{i}-\\bar{x})(y_{i}-\\bar{y})}{n-1}';
  linearRegression: string = '\\hat y=(w_{0}x_{0})+(w_{1}x_{1})+...+(w_{p}x_{p})+b';
  logisticRegression: string = 'log\\left(\\frac{Y}{1-Y}\\right)=C+B1X1+B2X2+...';

  //'Cov(x,y)=\\frac{\\sum_{i=1}^{N}(x_{i}-\\bar{x})(y_{i}-\\bar{y})}{N-1}$';
  constructor() { }

  ngOnInit(): void {
  }

}
