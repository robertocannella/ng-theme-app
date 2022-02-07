import { transition } from '@angular/animations';
import { ContentObserver } from '@angular/cdk/observers';
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
  currentValues: any[] = [];
  _buttons: boolean = true;
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
    for (let i = 0; i < 0; i++) {
      let newNodeValue = Math.floor(Math.random() * 50)
      this.linkedList.addLast(newNodeValue)
    }
    this.dataset = this.linkedList.toLLNodeArray();
  }
  async btnfunc() { // add
    let newNodeValue = Math.floor(Math.random() * 50)
    this.currentValues = this.linkedList.toArray();

    console.log(this.currentValues)
    while (this.currentValues.includes(newNodeValue))
      newNodeValue = Math.floor(Math.random() * 50)


    this.linkedList.addLast(newNodeValue)
    this.dataset = this.linkedList.toLLNodeArray()
    this.toggleButtons();
    await this.showAddLast();
    this.toggleButtons();
    this.updateSVG();


  }
  async btnfunc2() { // remove
    if (!this.linkedList.isEmpty()) {
      this.linkedList.deleteLast();
      this.dataset = this.linkedList.toLLNodeArray()

      this.updateSVG();
    }
  }
  btnfunc3() { //randomize
    this.displayLinks(200);
    // for (var i = 0; i < this.dataset.length; i++) {
    //   this.dataset[i].value = Math.floor(Math.random() * 50);
    // }
    // this.updateSVG();
  }
  async updateSVG() {
    let defualtDuration = 200;
    d3.selectAll('#show-add-last')
      .transition()
      .duration(1000)
      .delay(100)
      .attr('opacity', 0)
      .remove()

    d3.select('#link-list-nodes')
      .selectAll('g')
      .data(this.dataset)
      .join(
        (enter) => {
          return enter
            .append('g')
            .attr('class', 'll-group')
            .each(async (d: LLNode, i: any, nodes: any) => {


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
  showAddLast() {
    let currentSVG = d3.select('#link-list-nodes')

    // var currentX = d3.select('#link-list-nodes').select('#rect' + currentValue).attr('x')
    let index = this.currentValues.length;


    return Promise.all([


      currentSVG
        .append('rect')
        .attr('width', 40)
        .attr('height', 60)
        .attr('id', 'show-add-last')
        .attr('y', 75)
        .attr('x', 0)
        .attr('opacity', 0.75)
        .attr('fill', 'orange')
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
        .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
        .transition()
        .duration(() => index * Math.sqrt(1000))
        .delay(0)
        .attr('x', (d: any, i: any) => this.xScale(index.toString()))
        .remove()
        .transition()
        .duration(() => index * Math.sqrt(1000))
        .delay(50)
        .attr('y', 150)
        .end()

    ])



  }
  displayLinks(defualtDuration: number) {
    let listToArray = this.linkedList.toLLNodeArray();
    let currentSVG = d3.selectAll('g.ll-group')
    currentSVG.selectAll('.link').remove();
    currentSVG
      .append('line')
      .data(listToArray)
      .attr('class', 'link')
      .attr('id', (d: any, i: any) => 'line' + d.value)
      .attr('x1', (d: any, i: any) => i > 0 ? this.xScale(i.toString()) : 0)
      .attr('y1', (d: any, i: any) => i > 0 ? 175 : 0)
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
      .attr('x2', (d: any, i: any) => {
        let previousX: number = parseInt(currentSVG.select(`#rect${d.previous.value}`).attr('x'));
        return i > 0 ? previousX + 40 : 0;
      })
      .attr('y2', (d: any, i: any) => i > 0 ? 155 : 0)
      .attr('opacity', .75)
      .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
      .transition()
      .duration(defualtDuration)
      .delay(200)
      .attr('opacity', .75)



    // .on('end', (d: any, i: any) => {
    //   if (d.next === null)
    //     currentNode
    //       .attr('y', 150)
    // } )
  }
  ////UTILITY FUNCTIONS
  toggleButtons() {
    let buttons = document.querySelectorAll('button'); // Disable all the buttons
    if (this._buttons) {
      buttons.forEach((button) => {
        button.disabled = true;
        this._buttons = false;
      })
    }
    else {
      buttons.forEach((button) => {

        button.disabled = false;
        this._buttons = true;
      })
    }
  }
}
