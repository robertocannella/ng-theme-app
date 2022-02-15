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
  d3Zoom: any;
  constructor(private svg: SvgService) {

    this.xScale = d3.scaleLinear()
      .domain([0, 15])
      .range([0, this.svg.properties.width + 100])
    this.hScale = d3.scaleLinear()
      .domain([0, 110])
      .range([0, this.svg.properties.height])
    this.yScale = d3.scaleLinear()
      .domain([0, 80])
      .range([this.svg.properties.height, 0])
    this.d3zoom = d3.zoom().scaleExtent([.4, 1.1]);
  }
  properties = {
    defaultDuration: 200

  }
}
