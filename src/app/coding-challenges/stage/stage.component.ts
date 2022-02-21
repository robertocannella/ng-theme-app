import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Approach } from '../duplicate-zeros/Approach';
import * as d3 from 'd3';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.sass', '../coding-challenges.component.sass']
})
export class StageComponent implements OnInit, AfterViewInit, OnDestroy {
  width = 600;
  height = 200;
  vbWidth = 325;
  vbHeight = 150;
  xmlns = 'http://www.w3.org/2000/svg';
  @Input('dataset') dataset: any[] = [];
  @Input() approach!: Approach;
  @Output() isPlayingEvent = new EventEmitter<number>();
  @Input() isParentPlaying = false;
  isPlaying: boolean = false;
  isHandheld: boolean = false;
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
  ngOnDestroy(): void {
    d3.select(`#coding-stage-${this.approach.svgId}`).remove();
  }
  ngAfterViewInit(): void {
    this.buildSVG();
    this.approach.update();
  }
  async animate() {
    this.isPlayingEvent.emit(1)
    await this.approach.beginAnimate().then(() => { this.isPlayingEvent.emit(-1) });
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
