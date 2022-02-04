import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as d3Transform from 'd3';
import { initializeApp } from 'firebase/app';
import { AnonymousSubject } from 'rxjs/internal/Subject';


interface LinkedList {
  value: number;
}

@Component({
  selector: 'app-linkedlists',
  templateUrl: './linkedlists.component.html',
  styleUrls: ['./linkedlists.component.sass']
})
export class LinkedlistsComponent implements OnInit {
  title: string = 'Linked Lists';
  dataset: LinkedList[] = [];

  // SVG Components
  width = 700;
  height = 120;
  vbWidth = 400;
  vbHeight = 150;
  xmlns = 'http://www.w3.org/2000/svg';
  svgId = 'link-list-nodes';

  // D3 Components
  d3zoom: any = d3.zoom();
  panX: number = 0;
  panY: number = 0;
  panScale: number = 1;
  canvas: any;
  bars: any;
  xScale: any;
  hScale: any;
  yScale: any;
  buttons: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.buildSVG();
  }
  buildSVG() {
    this.canvas = d3.select('#svg-linked-lists')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0 0 ${this.vbWidth} ${this.vbHeight}`)
      .attr('id', this.svgId)
      .attr('xmlns', this.xmlns)
      .call(this.d3zoom
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
    this.xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, 700])
    this.hScale = d3.scaleLinear()
      .domain([0, 110])
      .range([0, this.height])
    this.yScale = d3.scaleLinear()
      .domain([0, 80])
      .range([200, 0])

    this.bars = this.canvas.selectAll('rect');

    for (let i = 0; i < 10; i++) {
      this.fillArray(this.dataset)
    }
    this.update();
  }
  fillArray(arr: any[]) {
    arr.push({ 'value': Math.floor(Math.random() * 50) })
  }
  btnfunc() { // add
    this.fillArray(this.dataset);
    this.update();
  }
  btnfunc2() { // remove
    this.dataset.pop();
    this.update();
  }
  btnfunc3() { //randomize
    for (var i = 0; i < this.dataset.length; i++) {
      this.dataset[i].value = Math.floor(Math.random() * 50);
    }
    this.update();
  }
  update() {
    this.bars = this.canvas.selectAll('rect').data(this.dataset);

    this.bars
      .join('rect')
      .attr('width', 20)
      .attr('height', (d: any) => this.hScale(d.value))
      .attr('y', (d: any) => this.height - this.hScale(d.value))
      .attr('x', (d: any, i: any) => i * 14 * 2)
      .style('fill', 'red')
      .text((d: any) => d.value)
      .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`);

    this.bars.exit().remove();
  }
  zoom(event: any) {
    d3.select('div#svg-linked-lists')
      .selectAll('text,rect')
      .attr('transform', event.transform)
  }
}
