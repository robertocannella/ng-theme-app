import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
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
  canvas: any;

  ngOnInit(): void {
    //this.d3Service.reset()
    //this.buildSVG();
  }
  //

  // buildSVG() {

  //   this.d3Service.properties.canvas
  //     .append('svg')
  //     .attr('width', this.svg.properties.width)
  //     .attr('height', this.svg.properties.height)
  //     .attr('viewBox', `-100 100 ${this.svg.properties.vbWidth} ${this.svg.properties.vbHeight}`)
  //     .attr('id', this.svg.properties.svgId)
  //     .attr('xmlns', this.svg.properties.xmlns)
  //     .call(this.d3Service.d3zoom
  //       .on("zoom", (event: any) => this.d3Service.zoom(event))
  //       .on('end', (event: any) => {
  //         if (event.transform !== d3.zoomIdentity) {
  //           let vectorPan: any = event.transform
  //           this.d3Service.panX = vectorPan.x;
  //           this.d3Service.panY = vectorPan.y;
  //           this.d3Service.panScale = vectorPan.k;
  //           this.d3Service.logPan();

  //           console.log("FromBUILD", ' panx', this.d3Service.panX, ' panY', this.d3Service.panY, ' K', this.d3Service.panScale)
  //         }
  //       })
  //     )

  //   this.d3Service.properties.canvas
  //     .append('defs')
  //     .append('marker')
  //     .attr('id', 'arrowhead')
  //     .attr('markerWidth', 10)
  //     .attr('markerHeight', 7)
  //     .attr('refX', 0)
  //     .attr('refY', 3.5)
  //     .append('polygon')
  //     .attr('points', `0 0, 10 3.5, 0 7`)

  //   //this.canvas.transition().call(this.d3zoom.translateBy, -100, 0)
  //   //this.canvas.transition().call(this.d3zoom.scaleBy, 0.9);
  //   let x: any = document.getElementById('svg-coding-stage')

  // x.scrollTo({
  //   top: 0,
  //   left: (this.svg.properties.vbWidth / 2),
  //   behavior: 'smooth'
  // })
  //}
}
