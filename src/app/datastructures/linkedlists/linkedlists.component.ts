import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as d3Transform from 'd3';
import { LinkedList, LLNode } from './LinkedList';


@Component({
  selector: 'app-linkedlists',
  templateUrl: './linkedlists.component.html',
  styleUrls: ['./linkedlists.component.sass']
})
export class LinkedlistsComponent implements OnInit {
  title: string = 'Linked List';
  dataset: LLNode[] = [];

  // SVG Components
  width = 700;
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
  linkedList: LinkedList = new LinkedList()
  dataValues = new Set()
  constructor() { }

  ngOnInit(): void {
    this.buildSVG();
  }
  buildSVG() {
    this.xScale = d3.scaleLinear()
      .domain([0, 15])
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
      .attr('viewBox', `-100 100 ${this.vbWidth} ${this.vbHeight}`)
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
    this.getArray(this.dataset)
    this.updateSVG();
  }
  async getArray(arr: LLNode[]) {
    // build linked list
    for (let i = 0; i < 1; i++) {
      let newNodeValue = Math.floor(Math.random() * 50)
      this.linkedList.addLast(newNodeValue)
    }
    this.dataset = this.linkedList.toLLNodeArray();
  }
  async btnfunc() { // add
    let newNodeValue = Math.floor(Math.random() * 50)
    while (this.dataValues.has(newNodeValue))
      newNodeValue = Math.floor(Math.random() * 50)


    this.dataValues.add(newNodeValue);
    this.linkedList.addLast(newNodeValue)
    this.dataset = this.linkedList.toLLNodeArray()
    this.updateSVG();


  }
  async btnfunc2() { // remove
    if (!this.linkedList.isEmpty()) {
      this.dataValues.delete(this.linkedList.last?.value)
      this.linkedList.deleteLast();
      this.dataset = this.linkedList.toLLNodeArray()

      this.updateSVG();
    }
  }
  btnfunc3() { //randomize
    for (var i = 0; i < this.dataset.length; i++) {
      this.dataset[i].value = Math.floor(Math.random() * 50);
    }
    this.updateSVG();
  }
  async updateSVG() {
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

              // Placeholder for value
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

              // Placeholder for Next

              d3.select(nodes[i]).append('text')
                .text('next')
                .attr('id', 'next-placeholder')
                .attr('alignment-baseline', 'central')
                .attr('text-anchor', 'middle')
                .attr('class', 'next-placeholder')
                .attr('x', (d: any, index: any) => this.xScale(i.toString()) + 20)
                .attr('y', 155)
                .attr('font-size', ".70em")
                .attr('opacity', 0)
                .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
                .transition()
                .duration(defualtDuration)
                .delay(200)

            })

        },
        (update) => {
          return update
            //.data(this.dataset)
            .each((d: any, i: any, nodes: any) => {
              d3.select(nodes[i]).selectAll('rect')
                .attr('id', (d: any, i: any) => 'rect' + d.value)
                .attr('x', (d: any, index: any) => this.xScale(i.toString()))

              d3.select(nodes[i]).selectAll(`#text${d.value}`)
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
      .attr('id', (d: any) => 'group' + d.value)
      .attr('cursor', 'pointer')
      .each((d: LLNode, i: any, nodes: any) => {
        let shapes = ['rect', 'circle', 'text', 'line']
        shapes.forEach(element => {
          d3.select(nodes[i]).selectAll(element)
            .on('click', (event) => {
              console.log(`Node: ${d.value}`, d)
              console.log(event)
            })
            .transition()
            .duration(defualtDuration)
            .attr('opacity', .75)
        });
      })
    this.displayLinks(defualtDuration + 200);

  }
  zoom(event: any) {
    d3.select('div#svg-linked-lists')
      .selectAll('text,rect,circle,line')
      .attr('transform', event.transform)
  }
  displayLinks(defualtDuration: number) {
    let currentSVG = d3.select('#link-list-nodes')
    let listToArray = this.linkedList.toLLNodeArray();
    currentSVG.selectAll('g line').remove();

    currentSVG.selectAll('line')
      .data(listToArray)
      .join(enter => {
        return enter
          .append('line')
          .each((d: any, i: any, nodes) => {
            let currentNode = d3.select(nodes[i]);
            console.log('dataset: ', listToArray)
            currentSVG.select(`#line${d.value}`).remove();

            currentNode
              .attr('class', 'element-value')
              .attr('id', (d: any, i: any) => 'line' + d.value)
              .attr('x1', () => i > 0 ? this.xScale(i.toString()) : 0)
              .attr('y1', () => i > 0 ? 175 : 0)
              .attr('stroke-width', 1)
              .attr('stroke', 'black')
              .attr('x2', () => {
                let previousX: number = parseInt(currentSVG.select(`#rect${d.previous.value}`).attr('x'));

                return i > 0 ? previousX + 40 : 0;
              })
              .attr('y2', () => i > 0 ? 155 : 0)
              .attr('opacity', 0)
              .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
              .transition()
              .duration(defualtDuration)
              .delay(200)
              .attr('opacity', 1).on('end', () => {
                if (d.next === null)
                  currentNode
                    .attr('y', 150)
              })
          })
      },
        // (update) => {
        //   return update
        //     //.data(this.dataset)
        //     .each((d: any, i: any, nodes: any) => {
        //       d3.select(nodes[i]).selectAll('line')
        //         .attr('x2', (d: any, i: any) => {
        //           if (d.next === d.next || d.next === null) {
        //             let nextX: string = currentSVG.select(`#rect${d.value}`).attr('x');
        //             console.log("connect x2 to : #rect", d.value, ': ', nextX)
        //             console.log(this.dataset)
        //             return parseInt(nextX)
        //           }
        //           else {
        //             let nextX: string = currentSVG.select(`#rect${d.next.value}`).attr('x');
        //             console.log('not null')
        //             return parseInt(nextX + 20);
        //           }
        //         })
        //     })
        // }
      )

  }
}
