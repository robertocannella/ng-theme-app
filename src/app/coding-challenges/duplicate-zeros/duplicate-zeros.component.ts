import { coerceStringArray } from '@angular/cdk/coercion';
import { core } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as d3Transform from 'd3';
import { concatMapTo } from 'rxjs/operators';
import { D3Service } from 'src/app/d3.service';
import { SvgService } from 'src/app/svg.service';


@Component({
  selector: 'app-duplicate-zeros',
  templateUrl: './duplicate-zeros.component.html',
  styleUrls: ['./duplicate-zeros.component.sass', '../coding-challenges.component.sass']
})
export class DuplicateZerosComponent implements OnInit {
  //dataset = [2, 7, 7, 5, 8, 6, 4, 1, 0]  // only one zero at the end (fixed)
  //dataset = [8, 0, 2, 8, 2, 2, 8, 5, 0]   // one included zero and one zero at the end (fixed)
  //dataset = [8, 3, 5, 3, 7, 1, 8, 0, 0]   // two zeros at the end (fixed)
  dataset = [4, 4, 0, 4, 6, 0, 0, 4, 7]
  codingOutlet = d3.select('#coding-outlet')
  //D3 Components
  d3Zoom: any = d3.zoom().scaleExtent([.4, 1.1]);
  panX: number = 0;
  panY: number = 0;
  panScale: number = 1;
  canvas: any;
  nodes: any;
  xScale: any;
  hScale: any;
  yScale: any;
  totalElements: any;
  arrayWidth = 300;
  defaultDuration = 500;
  _buttons = false;
  padding = 20;
  width = 600;
  height = 200;
  vbWidth = 325;
  vbHeight = 150;
  xmlns = 'http://www.w3.org/2000/svg';
  svgId = 'coding-outlet';
  isPlayingAnimation = false;
  constructor(private svg: SvgService, private d3Service: D3Service) { }
  stopAnimation() {
    d3.select(`#${this.svgId}`).selectAll('*').interrupt()
    this.update();
    this.isPlayingAnimation = false;
    console.log('stop animation')
  }
  async test(qty: number, sizeEach: number) {
    for (let i = 0; i <= qty; i++) {

      this.dataset = []
      this.update();

      for (let j = 0; j < sizeEach; j++) {
        this.dataset.push(this.getRandomInt(0, 9))
      }
      console.log('test beginning for: ', this.dataset)
      this.update();
      await this.animate();

    }
  }
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);

    //The maximum is exclusive and the minimum is inclusive
  }
  async animate() {
    this._buttons = true;
    this.isPlayingAnimation = true;
    let n = this.dataset.length;


    let totalZeros = 0;
    let coords: any = [];
    for (let i = 0; i < n; i++) {
      let currRect = d3.select(`#rect${i}-${this.dataset[i]}`);
      let currText = d3.select(`#text${i}-${this.dataset[i]}`);
      coords.push({ rectX: currRect.attr('x'), textX: currText.attr('x') });
    }


    for (let i = 0; i < n; i++) {
      let curr = `#rect${i}-${this.dataset[i]}`

      await Promise.all([

        d3.select(curr)
          .transition()
          .duration(200)
          .attr('fill', '#79d14d')
          .end(),

        await new Promise(async (resolve, reject) => {

          if (this.dataset[i] === 0 && ((i + 1 + totalZeros) <= coords.length - 1)) {

            let _ = d3.select(`#group-${n - 1 - totalZeros}`).transition().duration(200).attr('opacity', 0).remove()
            for (let j = this.dataset.length - 1 - totalZeros; j > i + 1; j--) {
              let prevRect = d3.select(`#rect${j - 1}-${this.dataset[j - 1]}`)
              let prevText = d3.select(`#text${j - 1}-${this.dataset[j - 1]}`)
              await Promise.all([
                prevRect.transition().duration(200)
                  .attr('fill', 'orange')
                  .attr('x', () => {

                    return coords[j + totalZeros].rectX
                  })
                  .transition().duration(200)
                  .attr('fill', '#bbb')
                  .end(),

                prevText.transition().duration(200)
                  .attr('x', () => {

                    return coords[j + totalZeros].textX
                  })
                  .transition().duration(200)
                  .end(),
              ])
            }

            let newZeroGroup = d3.select(`#${this.svgId}`).append('g')

            newZeroGroup
              .append('rect')
              .attr('class', 'element-shape')
              .attr('width', 28)
              .attr('height', 40)
              .attr('id', () => `rectZero`)
              .attr('y', 15)
              .attr('x', () => coords[i + 1 + totalZeros].rectX)
              .attr('fill', '#79d14d')
              .attr('opacity', 0)
              .transition().duration(200)
              .attr('opacity', 1)

            newZeroGroup
              .append('text')
              .text('0')
              .attr('y', 40)
              .attr('x', () => coords[i + 1 + totalZeros].textX)
              .attr('opacity', 0)
              .transition().duration(200)
              .attr('opacity', 1)

            totalZeros++;


          }
          setTimeout(resolve, 200);
        }),

      ])
    }
    this.isPlayingAnimation = false;
    this.update();
  }

  addNaturalNumber() {
    this.dataset.push(this.getRandomInt(1, 9))

  }
  addZero() {
    this.dataset.push(0)
    this.update();
  }
  pop() {
    this.dataset.pop();
    this.update();
  }
  ngOnInit(): void {
    this.buildSVG();
    this.update();
  }
  buildSVG() {
    d3.select('#svg-coding-stage')
      .append('svg')
      .attr('width', this.width)
      .attr('id', this.svgId)
      .attr('xmlns', this.xmlns)
  }

  update() {
    d3.select('#coding-outlet').selectAll('*').remove()

    d3.select('#coding-outlet')
      .selectAll('g')
      .data(this.dataset)
      .join(
        (enter) => {
          return enter
            .append('g')
            .attr('class', 'll-group')
            .attr('id', (d: any, i: any) => `group-${i}`)
            .each(async (data: any, index: any, nodes: any) => {

              let node = d3.select(nodes[index])
              node
                .append('rect')
                .attr('class', 'element-shape')
                .attr('width', 28)
                .attr('height', 40)
                .attr('id', () => `rect${index}-${data}`)
                .attr('y', 15)
                .attr('x', () => 30 * index)
                .attr('fill', '#bbb')
                .attr('stroke', 1)
                .attr('stroke-width', 1)

              node
                .append('text')
                .attr('class', 'element-text')
                .text(data)
                .attr('id', () => `text${index}-${data}`)
                .attr('x', () => (30 * index) + 10)
                .attr('y', 40)
            })
        })
  }

}
