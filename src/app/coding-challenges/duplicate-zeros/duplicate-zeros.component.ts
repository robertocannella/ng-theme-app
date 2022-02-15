import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as d3Transform from 'd3';
import { D3Service } from 'src/app/d3.service';
import { SvgService } from 'src/app/svg.service';


@Component({
  selector: 'app-duplicate-zeros',
  templateUrl: './duplicate-zeros.component.html',
  styleUrls: ['./duplicate-zeros.component.sass']
})
export class DuplicateZerosComponent implements OnInit, OnDestroy {

  codingOutlet: any;
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
  defaultDuration = 200;

  constructor(private svg: SvgService, private d3Service: D3Service) { }

  ngOnInit(): void {
    this.codingOutlet = d3.select('#coding-outlet');
    this.codingOutlet.selectAll('g').remove()
    this.update();
  }
  ngOnDestroy(): void {
    // Save all data (panX panY panScale to localstorage)
  }

  update() {
    this.codingOutlet
      .selectAll('g')
      .data([1, 2, 3, 4])
      .join(
        (enter: any) => {
          return enter
            .append('g')
            .attr('class', 'll-group')
            .each(async (d: any, i: any, nodes: any) => {
              d3.select(nodes[i]).append('rect')
                .attr('width', 40)
                .attr('height', 40)
                .attr('id', (d: any, i: any) => 'rect' + d.value)
                .attr('y', 150)
                .attr('x', () => this.d3Service.xScale(i.toString()))
                .attr('fill', 'orange')
                .attr('stroke-width', 1)
                .attr('stroke', 'black')
                .attr('stroke-opacity', 1)
                .attr('opacity', .75)
                .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
                .transition()
                .duration(this.d3Service.properties.defaultDuration)
            })
        }



        //         // Placeholder for value
        //         d3.select(nodes[i]).append('text')
        //           .text((d: any) => d.value)
        //           .attr('alignment-baseline', 'central')
        //           .attr('text-anchor', 'middle')
        //           .attr('class', 'element-value')
        //           .attr('id', (d: any, i: any) => 'text' + d.value)
        //           .attr('x', (d: any, index: any) => this.xScale(i.toString()) + 20)
        //           .attr('y', 175)
        //           .attr('opacity', .75)
        //           .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
        //           .transition()
        //           .duration(this.defaultDuration)

        //         // Placeholder for Next

        //         d3.select(nodes[i]).append('text')
        //           .text('null')
        //           .attr('id', (d: any) => 'next-placeholder' + d.value)
        //           .attr('alignment-baseline', 'central')
        //           .attr('text-anchor', 'middle')
        //           .attr('class', 'next-placeholder')
        //           .attr('x', (d: any, index: any) => this.xScale(i.toString()) + 20)
        //           .attr('y', 156)
        //           .attr('font-size', ".70em")
        //           .attr('opacity', .75)
        //           .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)
        //           .transition()
        //           .duration(this.defaultDuration)
        //           .delay(200)

        //       })

        //   },
        //   (update) => {
        //     return update
        //       .each((d: any, i: any, nodes: any) => {
        //         d3.select(nodes[i]).selectAll('rect')
        //           .attr('id', (d: any, i: any) => 'rect' + d.value)
        //           .attr('x', (d: any, index: any) => this.xScale(i.toString()))

        //         d3.select(nodes[i]).selectAll(`#text${d.value}`)
        //           .attr('id', (d: any, i: any) => 'text' + d.value)
        //           .text((d: any) => d.value)

        //         d3.select(nodes[i]).selectAll(`.next-placeholder`)
        //           .text(() => {
        //             if (i === 0)
        //               return 'head'
        //             else
        //               return d.next === null ? 'null' : 'next'
        //           })
        //       })
        //   },
        // (exit) => {
        //   return exit
        //     .each((d: LLNode, i: any, nodes: any) => {
        //       let shapes = ['rect', 'circle', 'text']
        //       shapes.forEach(element => {
        //         d3.select(nodes[i]).selectAll(element)
        //           .transition()
        //           .duration(this.defaultDuration)
        //           .attr('opacity', 0)
        //           .remove();
        //       });
        //     })
        //     .transition()
        //     .duration(this.defaultDuration)
        //     .remove();
        // }
        // )
        // .attr('id', (d: any) => 'group' + d.value)
        // .attr('cursor', 'pointer')
        // .each((d: LLNode, i: any, nodes: any) => {
        //   let shapes = ['rect', 'circle', 'text', 'line']
        //   shapes.forEach(element => {
        //     d3.select(nodes[i]).selectAll(element)
        //       .on('click', (event) => {
        //         console.log(`Node: ${d.value}`, d)
        //         console.log(event)
        //       })
        //       .transition()
        //       .duration(this.defaultDuration)
        //       .attr('opacity', .75)
        //   });
        // })
        //this.displayLinks(this.defaultDuration);
      )
  }

}
