import { Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BreakpointObserver, LayoutModule, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-duplicate-zeros',
  templateUrl: './duplicate-zeros.component.html',
  styleUrls: ['./duplicate-zeros.component.sass', '../coding-challenges.component.sass']
})
export class DuplicateZerosComponent implements OnInit, OnDestroy {
  dataset = [8, 0, 2, 0, 2, 2, 8, 5, 0]
  datasetStage2 = [8, 0, 2, 0, 2, 2, 8, 5, 0]

  defaultDuration = 500;
  _buttons = false;
  _buttonsStage2 = false;
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
  currentJStage2 = 0
  totalZerosStage2 = 0
  isHandheld: boolean = false;

  constructor(public breakpointObserver: BreakpointObserver) { }

  /// Angular Methods
  ngOnInit(): void {

    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe((state: BreakpointState) => {
      this.isHandheld = (state.matches)
    });

    this.buildSVG();
    this.update();
    this.updateStage2();
  }
  ngOnDestroy(): void {
    this.stopAnimation();
    this.stopAnimationStage2();
    // unsubscribe from breakpoint subscription
  }
  /// Common Methods
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
  async playAll() {
    return Promise.all([
      this._animateStage2(),
      this.animate()
    ]).then(() => {
      this.update()
      this.updateStage2()
    })
  }
  // Stage 1 Buttons
  async test(sizeEach: number = this.getRandomInt(9, 9)) {
    this.isPlayingAnimation = true
    while (this.isPlayingAnimation) {

      this.dataset = []
      this.update();

      for (let j = 0; j < sizeEach; j++) {
        this.dataset.push(this.getRandomInt(0, 9))
      }
      this.update();
      await this.animate();
    }
  }
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
  async testStage2(sizeEach: number = this.getRandomInt(9, 9)) {
    this.isPlayingAnimationStage2 = true;
    while (this.isPlayingAnimationStage2) {

      this.datasetStage2 = []
      this.updateStage2();

      for (let j = 0; j < sizeEach; j++) {
        this.datasetStage2.push(this.getRandomInt(0, 9))
      }
      this.updateStage2();
      await this._animateStage2();
    }
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
          .attr('fill', () =>
            (this.dataset[i] === 0) ? 'cornflowerblue' : '#79d14d')
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
                  .attr('fill', '#fcba03')
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
              .attr('fill', 'cornflowerblue')
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
    //this.isPlayingAnimation = false;
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

    d3.select(`#${this.svgStage2}`).selectAll('rect').transition();
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
    for (let i = 0; i < n; i++) {  // list of x coordinates for text and rect
      let currRect = d3.select(`#rect${i}-${this.datasetStage2[i]}-stage2`);
      let currText = d3.select(`#text${i}-${this.datasetStage2[i]}-stage2`);
      coords.push({ rectX: currRect.attr('x'), textX: currText.attr('x') });
    }

    for (let i = 0; i <= n; i++) {
      let curr = `#rect${i}-${this.datasetStage2[i]}-stage2`
      this.currentIStage2 = i

      await Promise.all([
        d3.select(curr)
          .transition()
          .duration(200)
          .attr('fill', (data: any, index: any, nodes: any) => {
            if (this.datasetStage2[i] === 0) {
              let remainSpace = n - i
              if (i > n - this.totalZerosStage2) return '#fcba03'; // yellow

              if (this.totalZerosStage2 >= remainSpace) {
                return '#79d14d' // green
              }
              d3.select(nodes[index]).attr('duplicate', true) // tag with "duplicate" attribute for later processing
              this.totalZerosStage2++;
              return 'cornflowerblue';
            }
            else {
              if (i > n - this.totalZerosStage2) return '#fcba03'; // yellow
              return '#79d14d' // green
            }
          }).end()
      ])
    }
    return Promise.all([
      this.secondPassStage2(),
      this.timeout(100), // time between each iteration
    ]);
  }
  /// STAGE 2 Helper Methods
  secondPassStage2() {
    return new Promise(async (resolve) => {
      if (this.totalZerosStage2 < 1) resolve(false);
      else {
        let n = this.datasetStage2.length - 1;
        let last = n - this.totalZerosStage2;
        let coords: any = [];
        // save all the X-Positions into a list
        for (let i = 0; i <= n; i++) {
          let currRect = d3.select(`#rect${i}-${this.datasetStage2[i]}-stage2`);
          let currText = d3.select(`#text${i}-${this.datasetStage2[i]}-stage2`);
          coords.push({ rectX: currRect.attr('x'), textX: currText.attr('x') });
        }
        await this.clearEnds();

        // Start backwards from the last element which would be part of new array.
        for (let j = last; j >= 0; j--) {
          this.currentJStage2 = j

          await this.insertAnimation(j, coords)

          if (this.totalZerosStage2 === 0) break;
        }
        resolve(true)
      }
    })
  }
  updateAwait() {
    return new Promise((resolve) => {
      this.updateStage2();
      resolve(true)
    })
  }
  insertAnimation(index: number, coords: any[]) {
    return new Promise(async (resolve, reject) => {
      let lastRect = d3.select(`#rect${index}-${this.datasetStage2[index]}-stage2`)
      let lastText = d3.select(`#text${index}-${this.datasetStage2[index]}-stage2`)

      if (this.datasetStage2[index] === 0 && lastRect.attr('duplicate')) {
        await this.insertZero(index, coords)
        this.totalZerosStage2--;
      }
      // interrupt code below not used, but cool idea to store animation stat in localstorage for pause/resume functionallity
      lastRect.transition().duration(400).attr('x', coords[index + this.totalZerosStage2].rectX)
        .on('interrupt', (_: any, index: any, nodes: any) => {
          reject(false);
          localStorage.setItem(nodes[index], d3.select(nodes[index]).attr('x'))
        })
      lastText.transition().duration(400).attr('x', coords[index + this.totalZerosStage2].textX)

      setTimeout(resolve, 400)

    });
  }
  clearEnds() {
    return new Promise(async (resolve) => {
      let len = this.datasetStage2.length - 1
      for (let i = 0; i < this.totalZerosStage2; i++) {
        d3.select(`#rect${len - i}-${this.datasetStage2[len - i]}-stage2`).remove()
        d3.select(`#text${len - i}-${this.datasetStage2[len - i]}-stage2`).remove()
      }
      resolve(true)
    })
  }
  insertZero(index: number, coords: any[]) {
    return new Promise((resolve) => {
      d3.select(`#${this.svgStage2}`).append('g')
        .append('rect')
        .attr('class', 'element-shape')
        .attr('width', 28)
        .attr('height', 40)
        .attr('id', () => `rect${index + this.totalZerosStage2}-'0'-stage2`)
        .attr('y', 15)
        .attr('x', () => {
          return coords[index + this.totalZerosStage2].rectX
        })
        .attr('fill', 'cornflowerblue')
        .attr('stroke', 1)
        .attr('stroke-width', 1)
        .attr('opacity', 0)
        .transition().duration(200).attr('opacity', 1)

      d3.select(`#${this.svgStage2}`).append('g')
        .append('text')
        .attr('class', 'element-text')
        .text('0')
        .attr('id', () => `text${index}-0}-stage2`)
        .attr('x', () => {
          return coords[index + this.totalZerosStage2].textX
        })
        .attr('y', 40)
        .attr('opacity', 0)
        .transition().duration(200).attr('opacity', 1)

      resolve(true)
    })
  }
  /// Utility Functions
  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);

    //The maximum is exclusive and the minimum is inclusive
  }
}
