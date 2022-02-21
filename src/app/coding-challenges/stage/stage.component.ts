import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Approach } from '../duplicate-zeros/Approach';
import * as d3 from 'd3';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.sass', '../coding-challenges.component.sass']
})
export class StageComponent implements OnInit, AfterViewInit {
  width = 600;
  height = 200;
  vbWidth = 325;
  vbHeight = 150;
  xmlns = 'http://www.w3.org/2000/svg';
  @Input('dataset') dataset: any[] = [];
  @Input() approach!: Approach;

  // Page Setup 
  isHandheld: boolean = false;
  isPlayingAnimation = false;
  stageId = '';
  constructor(public breakpointObserver: BreakpointObserver) {

  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe((state: BreakpointState) => {
      this.isHandheld = (state.matches)
    });
    this.stageId = `coding-stage-${this.approach.svgId}`;
  }
  ngAfterViewInit(): void {
    this.buildSVG();
    this.approach.update();
    console.log(this.approach)
  }
  pop() {
    this.approach.pop();
  }
  pushZero() {
    this.approach.push(0);
  }
  pushNaturalNumber() {
    this.approach.push()
  }
  buildSVG() {
    d3.select(`#coding-stage-${this.approach.svgId}`)
      .append('svg')
      .attr('width', this.width)
      .attr('id', `coding-outlet-${this.approach.svgId}`)
      .attr('xmlns', this.xmlns)
  }
}
