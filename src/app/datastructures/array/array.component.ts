import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { validateEventsArray } from '@angular/fire/compat/firestore';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { schemeGnBu } from 'd3';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AnonymousSubject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.sass']
})
export class ArrayComponent implements OnInit {

  title = 'Array';
  svg: any;
  ce: number[] = [];


  private width = 800;
  private height = 150;
  private vbWidth = 400;
  private vbHeight = 150;

  private y = d3.scaleLinear().range([this.vbHeight, 0])
    .domain([0, Math.max(...this.ce) + 3]);

  private xmlns = 'http://www.w3.org/2000/svg';
  private svgId = 'array-elements';
  d3zoom = d3.zoom();
  panX: number = 0;
  panY: number = 0;
  panScale: number = 1;



  constructor() { }

  ngOnInit(): void {
    this.buildSVG2()
  }

  buildSVG2() {
    this.svg = d3.select('div#svg-array')


    this.svg
      .append("svg")
      .attr('viewBox', `0 0 ${this.vbWidth} ${this.vbHeight}`)
      .attr('width', `${this.width}`)
      .attr('height', this.height)
      .attr('id', this.svgId)
      .attr('xmlns', this.xmlns)
      .call(this.d3zoom
        .on("zoom", (event: any) => this.zoomed(event))
        .on('end', (event: any) => {
          //console.log('zoom.end', event.transform, d3.zoomIdentity)
          if (event.transform !== d3.zoomIdentity) {
            console.log(event.transform)
            // ALLOWS TO RESET ZOOM PROGRAMATICALLY
            // remove anonymous function
            //d3.select(this).transition().delay(500).call(event.target.transform, d3.zoomIdentity)
            let vectorPan = event.transform
            this.panX = vectorPan.x;
            this.panY = vectorPan.y;
            this.panScale = vectorPan.k;
            console.log(this.panX, this.panY, this.panScale)

          }
        })
      )
    this.update();

  }
  update() {
    let xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([-100, 550])
    let svg = this.svg.select('svg')

    svg
      .selectAll('rect')
      .data(this.ce)
      .enter()
      .append('rect')
      .attr('width', 50)
      .attr('height', 50)
      .classed('element', true)
      .attr('x', (d: any, i: any) => xScale(i.toString()))
      .attr('y', 50)
      .attr('fill', 'white')
      .attr('stroke-width', 2)
      .attr('stroke', 'black')
      .attr('fill', 'purple')
      .attr('fill-opacity', .3)
      .attr('class', 'element')
      .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
      .each((data: any, i: any, nodes: any) => {
        let node = d3.select(nodes[i])
        node
          .on('click', () => {
            console.log(data) //, this.d3zoom)
          })
      })
    svg
      .selectAll('text')
      .data(this.ce)
      .enter()
      .append('text')
      .text((d: any) => d)
      .attr('alignment-baseline', 'central')
      .attr('text-anchor', 'middle')
      .attr('id', (d: any) => 'element' + d + 'text')
      .attr('x', (d: any, i: any) => xScale(i.toString()) + 25)
      .attr('y', 75)
      .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)


  }

  zoomed(event: any) {
    d3.select('div#svg-array')
      .selectAll('text,rect')
      .attr('transform', event.transform)
  }
  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  traverse() {
    d3.select('div#svg-array')
      .selectAll('rect')
      .each((d: any, i: any, nodes: any) => {
        let node = d3.select(nodes[i])
        node
          .transition()
          .duration(500)
          .delay(500 * i)
          .attr('fill-opacity', .8)
          .on('end', () => {
            node
              .transition()
              .duration(300)
              .attr('fill-opacity', .3)
          })
      })

  }
  obliterate() {
    d3.select('div#svg-array').selectAll('rect,text').remove();
    this.ce = []
    //this.update();
  }
  addRandomElement() {
    let value = this.randomIntFromInterval(0, 99)
    this.ce.push(value)
    this.update();
  }
}
