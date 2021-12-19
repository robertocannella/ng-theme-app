import { Component, OnInit } from '@angular/core';
import { KatexOptions } from 'ng-katex';
@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.sass']
})
export class MathComponent implements OnInit {
  aUnionB: string = '|A\\cup B| = n + k';
  rSquared: string = '\\sum_{i=1}^nx_i';
  denoteSet: string = 'S=\\{1,2,3,4\\}';
  emptySet: string = '\\varnothing';
  in: string = '\\in';
  cap: string = '\\cap';
  cup: string = '\\cup';
  subsetEq: string = '\\subseteq';
  ruleOfSum: string = '|A\\cup B| = |A| + |B| - |A\\cap B|';
  constructor() { }

  ngOnInit(): void {
  }

}
