import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as d3Transform from 'd3';
import { selection } from 'd3';
import { LinkedList, LLNode } from './LinkedList';





@Component({
  selector: 'app-linkedlists',
  templateUrl: './linkedlists.component.html',
  styleUrls: ['./linkedlists.component.sass']
})
export class LinkedlistsComponent implements OnInit {
  title: string = 'Linked Lists';
  dataset: LLNode[] = [];

  // SVG Components
  width = 500;
  height = 250;
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
  nodes: any;
  xScale: any;
  hScale: any;
  yScale: any;
  buttons: boolean = true;
  data: any = [];
  linkedList: LinkedList = new LinkedList()

  constructor() { }

  ngOnInit(): void {
    this.buildSVG();
  }
  buildSVG() {
    this.xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, this.width + 100])
    this.hScale = d3.scaleLinear()
      .domain([0, 110])
      .range([0, this.height])
    this.yScale = d3.scaleLinear()
      .domain([0, 80])
      .range([this.height, 0])


    this.canvas = d3.select('#svg-linked-lists')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `-20 100 ${this.vbWidth} ${this.vbHeight}`)
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

    for (let i = 0; i < 4; i++) {
      this.fillArray(this.dataset)
    }
    this.updateSVG();
  }
  fillArray(arr: LLNode[]) {
    let newNodeValue = Math.floor(Math.random() * 50)
    this.linkedList.addFirst(newNodeValue)
    let newNode = new LLNode(newNodeValue)
    arr.push(newNode)

  }
  btnfunc() { // add
    this.fillArray(this.dataset);
    this.updateSVG();
  }
  btnfunc2() { // remove
    this.dataset.pop();
    this.updateSVG();
  }
  btnfunc3() { //randomize
    for (var i = 0; i < this.dataset.length; i++) {
      this.dataset[i].value = Math.floor(Math.random() * 50);
    }
    this.updateSVG();
  }


  updateSVG() {
    let defualtDuration = 200;

    d3.select('#link-list-nodes')
      .selectAll('g')
      .data(this.dataset)
      .join(
        (enter) => {
          return enter
            .append('g')
            .each((d: LLNode, i: any, nodes: any) => {
              d3.select(nodes[i]).append('rect')
                .attr('width', 40)
                .attr('height', 60)
                .attr('id', (d: any, i: any) => 'rect' + d.value)
                .attr('y', 150)
                .attr('x', () => this.xScale(i.toString()))
                .attr('fill', 'orange')
                .attr('stroke-width', 1)
                .attr('stroke', 'black')
                .attr('opacity', 0)
                .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
                .transition()
                .duration(defualtDuration)

              d3.select(nodes[i]).append('text')
                .text((d: any) => d.value)
                .attr('alignment-baseline', 'central')
                .attr('text-anchor', 'middle')
                .attr('class', 'element-value')
                .attr('id', (d: any, i: any) => 'text' + d.value)
                .attr('x', (d: any, index: any) => this.xScale(i.toString()) + 20)
                .attr('y', 200)
                .attr('opacity', 0)
                .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
                .transition()
                .duration(defualtDuration)
            })
        },
        (update) => {
          return update
            //.data(this.dataset)
            .each((d: any, i: any, nodes: any) => {
              d3.select(nodes[i]).selectAll('rect')
                .attr('id', (d: any, i: any) => 'rect' + d.value)
                .attr('x', (d: any, index: any) => this.xScale(i.toString()))

              d3.select(nodes[i]).selectAll('text')
                .attr('id', (d: any, i: any) => 'text' + d.value)
                .text((d: any) => d.value)
            })
        },
        (exit) => {
          return exit
            .each((d: LLNode, i: any, nodes: any) => {
              let shapes = ['rect', 'circle', 'text']
              shapes.forEach(element => {
                d3.select(nodes[i]).selectAll(element)
                  .transition()
                  .duration(defualtDuration)
                  .attr('opacity', 0)
                  .remove();
              });
            })
            .transition()
            .duration(defualtDuration)
            .remove();
        }
      )
      .each((d: LLNode, i: any, nodes: any) => {
        let shapes = ['rect', 'circle', 'text']
        shapes.forEach(element => {
          d3.select(nodes[i]).selectAll(element)
            .attr('cursor', 'pointer')
            .on('click', (event) => {
              console.log(`Node: ${d.value}`, d)
              console.log(event)
            })
            .transition()
            .duration(defualtDuration)
            .attr('opacity', .75);
        });
      })

  }
  zoom(event: any) {
    d3.select('div#svg-linked-lists')
      .selectAll('text,rect,circle')
      .attr('transform', event.transform)
  }
}
