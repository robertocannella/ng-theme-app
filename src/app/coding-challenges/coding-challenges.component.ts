import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as d3Transform from 'd3';
import { D3Service } from '../d3.service';
import { SvgService } from '../svg.service';

@Component({
  selector: 'app-coding-challenges',
  templateUrl: './coding-challenges.component.html',
  styleUrls: ['./coding-challenges.component.sass']
})
export class CodingChallengesComponent implements OnInit {
  constructor(private svg: SvgService, private d3Service: D3Service) { }
  title: string = 'Coding Challenges';


  // SVG Components
  width = 700;
  height = 250;
  vbWidth = 400;
  vbHeight = 150;
  xmlns = 'http://www.w3.org/2000/svg';
  svgId = 'coding-outlet';

  // D3 Components
  d3zoom: any = d3.zoom().scaleExtent([.4, 1.1]);
  panX: number = 0;
  panY: number = 0;
  panScale: number = 1;
  canvas: any;
  nodes: any;
  xScale: any;
  hScale: any;
  yScale: any;


  ngOnInit(): void {
    this.buildSVG();
  }


  buildSVG() {
    this.xScale = d3.scaleLinear()
      .domain([0, 15])
      .range([0, this.svg.properties.width + 100])
    this.hScale = d3.scaleLinear()
      .domain([0, 110])
      .range([0, this.svg.properties.height])
    this.yScale = d3.scaleLinear()
      .domain([0, 80])
      .range([this.svg.properties.height, 0])


    this.canvas = d3.select('#svg-coding-stage')
      .append('svg')
      .attr('width', this.svg.properties.width)
      .attr('height', this.svg.properties.height)
      .attr('viewBox', `-100 100 ${this.svg.properties.vbWidth} ${this.svg.properties.vbHeight}`)
      .attr('id', this.svg.properties.svgId)
      .attr('xmlns', this.svg.properties.xmlns)
      .call(this.d3Service.d3zoom
        .on("zoom", (event: any) => this.zoom(event))
        .on('end', (event: any) => {
          if (event.transform !== d3.zoomIdentity) {
            let vectorPan: any = event.transform
            this.panX = vectorPan.x;
            this.panY = vectorPan.y;
            this.panScale = vectorPan.k;

          }
        })
      )

    this.canvas
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('markerWidth', 10)
      .attr('markerHeight', 7)
      .attr('refX', 0)
      .attr('refY', 3.5)
      .append('polygon')
      .attr('points', `0 0, 10 3.5, 0 7`)

    //this.canvas.transition().call(this.d3zoom.translateBy, -100, 0)
    //this.canvas.transition().call(this.d3zoom.scaleBy, 0.9);
    let x: any = document.getElementById('svg-coding-stage')

    x.scrollTo({
      top: 0,
      left: (this.vbWidth / 5.5),
      behavior: 'smooth'
    })
  }
  ////UTILITY FUNCTIONS
  zoom(event: any) {

    d3.select('div#svg-coding-stage')
      .selectAll('text,rect,circle,line')
      .attr('transform', event.transform)

  }
}
