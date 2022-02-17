import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as d3Transform from 'd3';


@Injectable({
  providedIn: 'root'
})
export class SvgService {
  width = 300;
  height = 450;
  vbWidth = 800;
  vbHeight = 150;
  xmlns = 'http://www.w3.org/2000/svg';
  svgId = 'coding-outlet';
  constructor() {

  }
  rebuildSVG() {
    this.destroySVG();
    this.buildSVG();
    return d3.select(`#${this.svgId}`);
  }
  buildSVG() {
    d3.select('#svg-coding-stage')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      //.attr('viewBox', `-100 100 ${this.vbWidth} ${this.vbHeight}`)
      .attr('id', this.svgId)
      .attr('xmlns', this.xmlns)
  }
  destroySVG() {
    d3.select('#svg-coding-stage').selectAll('*').remove();
  }
  enableZoomPan(d3Element: any, d3ZoomObject: any, component: any) {
    d3Element
      .call(d3ZoomObject
        .on("zoom", (event: any) => this.zoom(event))
        .on('end', (event: any) => {
          if (event.transform !== d3.zoomIdentity) {
            let vectorPan: any = event.transform
            component.panX = vectorPan.x;
            component.panY = vectorPan.y;
            component.panScale = vectorPan.k;
          }
        })
      )
  }

  zoom(event: any) {
    d3.select('div#svg-coding-stage')
      .selectAll('rect,text,line,circle')
      .attr('transform', event.transform)
  }
}
