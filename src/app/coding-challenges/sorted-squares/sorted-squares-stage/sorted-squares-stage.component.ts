import { AfterViewInit, Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BasicArray } from '../../BasicArray';
import * as d3 from 'd3';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sorted-squares-stage',
  templateUrl: './sorted-squares-stage.component.html',
  styleUrls: ['./sorted-squares-stage.component.sass']
})
export class SortedSquaresStageComponent implements OnInit {
  width = 600;
  height = 400;
  vbWidth = 325;
  vbHeight = 150;
  xmlns = 'http://www.w3.org/2000/svg';
  @Input('dataset') dataset: any[] = [];
  @Input() approach!: BasicArray;
  @Output() isPlayingEvent = new EventEmitter<number>();
  @Input() isParentPlaying = false;
  @Input() pushZeroButton: boolean = false;
  @Input() pushNegativeButton: boolean = false;
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
  async playRand() {
    this.isPlayingEvent.emit(1)
    await this.approach.beginPlayRandom().then(() => { this.isPlayingEvent.emit(-1) });
  }
  pop() {
    this.approach.pop();
  }
  clear() {
    this.approach.clear();
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
      .attr('height', this.height)
      .attr('id', `coding-outlet-${this.approach.svgId}`)
      .attr('xmlns', this.xmlns)
  }

}
