import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { SvgService } from './svg.service';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as d3Transform from 'd3';

@Injectable({
  providedIn: 'root'
})
export class D3Service {
  d3zoom: any = d3.zoom().scaleExtent([.4, 1.1]);
  xScale: any;
  hScale: any;
  yScale: any;
  private _panX: number;
  private _panY: number;
  private _panScale: number;



  constructor(private svg: SvgService) {
    this._panX = 0;
    this._panY = 0;
    this._panScale = 1;
    this.xScale = d3.scaleLinear()
      .domain([0, 15])
      .range([0, this.svg.width + 100])
    this.hScale = d3.scaleLinear()
      .domain([0, 110])
      .range([0, this.svg.height])
    this.yScale = d3.scaleLinear()
      .domain([0, 80])
      .range([this.svg.height, 0])
    this.d3zoom = d3.zoom().scaleExtent([.6, 1.1]);
  }
  public properties = {
    defaultDuration: 200,
    codingOutlet: d3.select('#coding-outlet'),
    canvas: d3.select('#svg-coding-stage')
  }
  public get panX() { return this._panX }
  public set panX(panX: number) {
    this._panX = panX;
  }
  public get panY() { return this._panY }
  public set panY(panY: number) {
    this._panY = panY;
  }
  public get panScale() { return this._panScale }
  public set panScale(panScale: number) {
    this._panScale = panScale;
  }
  reset() {
    d3.select(`#${this.svg.svgId}`).selectAll('*').remove();
    this.properties.canvas = d3.select('#svg-coding-stage')
    this.properties.codingOutlet = d3.select('#coding-outlet')
    this.d3zoom.transform(this.properties.canvas, d3.zoomIdentity.translate(0, 0).scale(1))
  }
  logPan() {

    console.log("D3Service ", 'panx', this._panX, ' panY', this.panY, ' K', this.panScale)

  }
  zoom(event: any) {
    d3.select('div#svg-coding-stage')
      .selectAll('rect,text,line,circle')
      .attr('transform', event.transform)
  }

}
