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
  styleUrls: ['./duplicate-zeros.component.sass', '../coding-challenges.component.sass']
})
export class DuplicateZerosComponent implements OnInit {
  datasetErrors: any = []
  //dataset = [2, 7, 7, 5, 8, 6, 4, 1, 0]  // only one zero at the end (fixed)
  dataset = [8, 0, 2, 0, 2, 2, 8, 5, 0]   // one included zero and one zero at the end (fixed)
  //dataset = [8, 3, 5, 3, 7, 1, 8, 0, 0]   // two zeros at the end (fixed)
  //dataset = [4, 4, 0, 4, 6, 0, 0, 4, 7]
  //datasetStage2 = [8, 0, 2, 0, 2, 2, 8, 5, 0]
  datasetStage2 = [8, 0, 2, 3, 2, 2, 8, 5, 0, 0]  // one zero with two zeros at the end (bug displays one too many yellow indexs)
  //datasetStage2 = [0, 8, 6, 7, 0, 4, 5, 0, 5, 3]
  codingOutlet = d3.select('#coding-outlet-1')
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
  _buttonsStage2 = false;
  padding = 20;
  width = 600;
  height = 200;
  vbWidth = 325;
  vbHeight = 150;
  xmlns = 'http://www.w3.org/2000/svg';
  svgStage1 = 'coding-outlet-1';
  svgStage2 = 'coding-outlet-2'
  isPlayingAnimation = false;
  isPlayingAnimationStage2 = false;
  currentI = 0
  currentJ = 0
  currentIStage2 = 0
  totalZerosStage2 = 0

  constructor(private svg: SvgService, private d3Service: D3Service) { }

  async test(qty: number, sizeEach: number) {
    while (true) {

      this.dataset = []
      this.update();

      for (let j = 0; j < sizeEach; j++) {
        this.dataset.push(this.getRandomInt(0, 9))
      }
      //console.log('test beginning for: ', this.dataset)
      this.update();
      await this.animate();


    }
  }
  async testStage2(sizeEach: number = this.getRandomInt(8, 13)) {
    while (true) {

      this.datasetStage2 = []
      this.updateStage2();

      for (let j = 0; j < sizeEach; j++) {
        this.datasetStage2.push(this.getRandomInt(0, 9))
      }
      this.updateStage2();
      await this._animateStage2();

    }
  }
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);

    //The maximum is exclusive and the minimum is inclusive
  }

  // Stage 1 Buttons
  addNaturalNumber() {
    this.dataset.push(this.getRandomInt(1, 9))
    this.update();
  }
  addZero() {
    this.dataset.push(0)
    this.update();
  }
  pop() {
    this.dataset.pop();
    this.update();
  }
  //Stage 2 Buttons
  addNaturalNumberStage2() {
    this.datasetStage2.push(this.getRandomInt(1, 9))
    this.updateStage2();
  }
  addZeroStage2() {
    this.datasetStage2.push(0)
    this.updateStage2();
  }
  popStage2() {
    this.datasetStage2.pop();
    this.updateStage2();
  }
  ngOnInit(): void {
    this.buildSVG();
    this.update();
    this.updateStage2();
  }
  ngOnDestroy(): void {
    this.stopAnimation();
    this.stopAnimationStage2();
  }
  buildSVG() {
    d3.select('#svg-coding-stage-1')
      .append('svg')
      .attr('width', this.width)
      .attr('id', this.svgStage1)
      .attr('xmlns', this.xmlns)

    d3.select('#svg-coding-stage-2')
      .append('svg')
      .attr('width', this.width)
      .attr('id', this.svgStage2)
      .attr('xmlns', this.xmlns)
  }

  // STAGE 1 Update
  update() {

    d3.select('#coding-outlet-1').selectAll('*').remove()

    d3.select('#coding-outlet-1')
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
  /// STAGE 1 Animation
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

      this.currentI = Math.min(i + totalZeros, this.dataset.length - 1)
      this.currentJ = 0
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
              this.currentJ = j
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

            let newZeroGroup = d3.select(`#${this.svgStage1}`).append('g')

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
  /// STAGE 1 Stop Animation
  stopAnimation() {
    this._buttons = false;
    d3.select(`#${this.svgStage1}`).selectAll('*').interrupt()
    this.update();
    this.isPlayingAnimation = false;

  }
  // STAGE 2 Update
  updateStage2() {
    d3.select('#coding-outlet-2').selectAll('*').remove()

    d3.select('#coding-outlet-2')
      .selectAll('g')
      .data(this.datasetStage2)
      .join(
        (enter) => {
          return enter
            .append('g')
            .attr('class', 'll-group-stage2')
            .attr('id', (d: any, i: any) => `group-${i}-stage2`)
            .each(async (data: any, index: any, nodes: any) => {

              let node = d3.select(nodes[index])
              node
                .append('rect')
                .attr('class', 'element-shape')
                .attr('width', 28)
                .attr('height', 40)
                .attr('id', () => `rect${index}-${data}-stage2`)
                .attr('y', 15)
                .attr('x', () => 30 * index)
                .attr('fill', '#bbb')
                .attr('stroke', 1)
                .attr('stroke-width', 1)

              node
                .append('text')
                .attr('class', 'element-text')
                .text(data)
                .attr('id', () => `text${index}-${data}-stage2`)
                .attr('x', () => (30 * index) + 10)
                .attr('y', 40)
            })
        })
  }
  /// STAGE 2 Stop Animation
  stopAnimationStage2() {
    this._buttonsStage2 = false;
    d3.select(`#${this.svgStage2}`).selectAll('*').interrupt()
    this.updateStage2();
    this.isPlayingAnimationStage2 = false;

  }
  async animateStage2() {
    await this._animateStage2();
    await this.updateAwait();
    this.isPlayingAnimationStage2 = false
  }
  /// STAGE 2 Animation
  async _animateStage2() {
    this._buttonsStage2 = true;
    this.isPlayingAnimationStage2 = true;
    let n = this.datasetStage2.length - 1;

    this.totalZerosStage2 = 0;
    let coords: any = [];
    for (let i = 0; i < n; i++) {
      let currRect = d3.select(`#rect${i}-${this.datasetStage2[i]}-stage2`);
      let currText = d3.select(`#text${i}-${this.datasetStage2[i]}-stage2`);
      coords.push({ rectX: currRect.attr('x'), textX: currText.attr('x') });
    }


    for (let i = 0; i <= n; i++) {
      let curr = `#rect${i}-${this.datasetStage2[i]}-stage2`

      this.currentIStage2 = i
      this.currentJ = 0

      await Promise.all([


        d3.select(curr)
          .transition()
          .duration(200)
          .attr('fill', () => {
            if (this.datasetStage2[i] === 0) {
              // Edge case: This zero can't be duplicated. We have no more space,
              // as left is pointing to the last element which could be included
              if (i >= n - this.totalZerosStage2) {

                if (this.totalZerosStage2 === 0) {
                  return '#79d14d'
                }
                return '#fcba03';
              }

              this.totalZerosStage2++;
            }
            if (i > n - this.totalZerosStage2) return '#fcba03';

            return (this.datasetStage2[i] === 0) ? 'cornflowerblue' : '#79d14d';
          })
          .end(),



        // await new Promise(async (resolve, reject) => {

        // //   if (this.dataset[i] === 0) {
        // //     let currRect = d3.select(`#rect${i}-${this.dataset[i]}-stage2`)
        // //     currRect
        // //       .attr('fill', 'blue')
        // //     //let _ = d3.select(`#group-${n - 1 - totalZeros}`).transition().duration(200).attr('opacity', 0).remove()

        // //     // for (let j = this.dataset.length - 1 - totalZerosStage2; j > i + 1; j--) {
        // //     //   this.currentJ = j
        // //     //   let prevRect = d3.select(`#rect${j - 1}-${this.dataset[j - 1]}`)
        // //     //   let prevText = d3.select(`#text${j - 1}-${this.dataset[j - 1]}`)
        // //     // await Promise.all([
        // //     //   prevRect.transition().duration(200)
        // //     //     .attr('fill', 'orange')
        // //     //     .attr('x', () => {

        // //     //       return coords[j + totalZeros].rectX
        // //     //     })
        // //     //     .transition().duration(200)
        // //     //     .attr('fill', '#bbb')
        // //     //     .end(),

        // //     //   prevText.transition().duration(200)
        // //     //     .attr('x', () => {

        // //     //       return coords[j + totalZeros].textX
        // //     //     })
        // //     //     .transition().duration(200)
        // //     //     .end(),
        // //     // ])
        // //     // }

        // //     // let newZeroGroup = d3.select(`#${this.svgStage2}`).append('g')

        // //     // newZeroGroup
        // //     //   .append('rect')
        // //     //   .attr('class', 'element-shape')
        // //     //   .attr('width', 28)
        // //     //   .attr('height', 40)
        // //     //   .attr('id', () => `rectZero`)
        // //     //   .attr('y', 15)
        // //     //   .attr('x', () => coords[i + 1 + totalZeros].rectX)
        // //     //   .attr('fill', '#79d14d')
        // //     //   .attr('opacity', 0)
        // //     //   .transition().duration(200)
        // //     //   .attr('opacity', 1)

        // //     // newZeroGroup
        // //     //   .append('text')
        // //     //   .text('0')
        // //     //   .attr('y', 40)
        // //     //   .attr('x', () => coords[i + 1 + totalZeros].textX)
        // //     //   .attr('opacity', 0)
        // //     //   .transition().duration(200)
        // //     //   .attr('opacity', 1)


        // //   }
        // //   setTimeout(resolve, 100);
        // // }
        // ),

      ])

    }
    // await new Promise(async (resolve, reject) => {
    //   setTimeout((resolve), 2000)
    //   this.isPlayingAnimationStage2 = false;
    //   this.updateStage2();
    // })
    return Promise.all([

      // d3.select() HERE
      this.edgeCaseTwo(),
      //this.updateAwait(),
      this.timeout(10),

    ]);


  }
  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  updateAwait() {
    return new Promise((resolve) => {
      this.updateStage2();
      resolve('done')
    })
  }
  edgeCaseTwo() {
    // Edge case two,  The last two indexes are zeros
    return new Promise((resolve) => {
      let n = this.datasetStage2.length - 1
      if (this.datasetStage2[n - this.totalZerosStage2] === 0) {
        let curr = `#rect${n - this.totalZerosStage2}-${this.datasetStage2[n - this.totalZerosStage2]}-stage2`
        d3.select(curr).attr('fill', `#79d14d`)
        console.log('n - 2 is a zero value')
        this.datasetErrors.push({ 'dataset': this.datasetStage2 })
        console.log("error sets: ", this.datasetErrors)
      }

      resolve('complete')
    })
  }
}
