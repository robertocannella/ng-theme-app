import { Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BreakpointObserver, LayoutModule, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-duplicate-zeros',
  templateUrl: './duplicate-zeros.component.html',
  styleUrls: ['./duplicate-zeros.component.sass', '../coding-challenges.component.sass']
})
export class DuplicateZerosComponent implements OnInit, OnDestroy {
  datasetStage1 = [4, 3, 3, 7, 0, 3, 0, 3]
  datasetStage2 = [...this.datasetStage1];

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
  isPlayingRandomSeq = false;
  currentI = 0
  currentJ = 0
  currentIStage2 = 0
  currentJStage2 = 0
  totalZerosStage1 = 0
  totalZerosStage2 = 0
  Stage1i = 0


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
    this.updateStage1();
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
  async compareAll() {
    this.resetAll();
    this.isPlayingRandomSeq = true
    this._buttons = true

    this.datasetStage2 = [...this.datasetStage1]
    this.updateStage2();
    this.updateStage1();
    await Promise.all([
      this._animateStage2(),
      this._animateStage1()
    ]).catch(e => this.resetAll());
  }
  resetAll() {
    this.stopAnimation()
    this.stopAnimationStage2()
    this.updateStage1()
    this.updateStage2()
    this.isPlayingAnimation = false
    this.isPlayingAnimationStage2 = false
    this.isPlayingRandomSeq = false
  }

  async randomAll(sizeEach: number = this.getRandomInt(9, 9)) {

    this.isPlayingRandomSeq = true
    this.isPlayingAnimation = true
    this._buttons = true
    while (this.isPlayingAnimation) {

      this.datasetStage1 = []

      for (let j = 0; j < sizeEach; j++) {
        this.datasetStage1.push(this.getRandomInt(0, 9))
      }
      this.datasetStage2 = [...this.datasetStage1]

      this.updateStage1();
      this.updateStage2();

      await Promise.all([
        this.animateStage1(),
        this.animateStage2()
      ]).catch(() => { this.resetAll() })
    }

  }
  stopRandomAll() {
    this.isPlayingRandomSeq = false
    this.isPlayingAnimation = false
    this.resetAll();
  }
  // Stage 1 Buttons
  async test(sizeEach: number = this.getRandomInt(9, 9)) {
    this.isPlayingAnimation = true
    while (this.isPlayingAnimation) {

      this.datasetStage1 = []
      this.updateStage1();

      for (let j = 0; j < sizeEach; j++) {
        this.datasetStage1.push(this.getRandomInt(0, 9))
      }
      this.updateStage1();
      await this.animateStage1().catch(e => console.log(e));
    }
  }
  addNaturalNumber() {
    this.datasetStage1.push(this.getRandomInt(1, 9))
    this.updateStage1();
  }
  addZero() {
    this.datasetStage1.push(0)
    this.updateStage1();
  }
  pop() {
    this.datasetStage1.pop();
    this.updateStage1();
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

  //// BEGIN STAGE 1 ANIMATIONS METHODS
  // STAGE 1 Update
  updateStage1() {
    d3.select('#coding-outlet-1').selectAll('*').remove()
    d3.select('#coding-outlet-1')
      .selectAll('g')
      .data(this.datasetStage1)
      .join(
        (enter) => {
          return enter
            .append('g')
            .attr('class', 'll-group')
            .attr('id', (_d: any, i: any) => `group-${i}`)
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
  async _animateStage1() {

    this.isPlayingAnimation = true;
    let n = this.datasetStage1.length - 1;
    this.totalZerosStage1 = 0;
    let coords: any[] = [];

    for (let i = 0; i <= n; i++) {
      let currRect = d3.select(`#rect${i}-${this.datasetStage1[i]}`);
      let currText = d3.select(`#text${i}-${this.datasetStage1[i]}`);
      coords.push({ rectX: currRect.attr('x'), textX: currText.attr('x') });
    }

    for (let i = 0; i <= n; i++) { // begin animation loop 

      let curr = `#rect${i}-${this.datasetStage1[i]}`;
      this.currentI = i;
      this.currentJ = 0;
      let remaingSpace = n - i;
      let currRect = d3.select(curr)
      await currRect   // set tile colors here
        .transition()
        .duration(200)
        .attr('fill', (_data: any, index: any, nodes: any) => {
          if (this.datasetStage1[i] === 0) { // initial loop
            if (this.totalZerosStage1 >= remaingSpace) {
              return '#79d14d'; // green
            }
            d3.select(nodes[index]).attr('isDuplicate', true);
            this.totalZerosStage1++;
            return 'cornflowerblue';
          }
          else {
            if (i > n - this.totalZerosStage1) return '#fcba03' // yellow
            return '#79d14d'  // green
          }
        }).on('interrupt', () => { i = this.datasetStage1.length + 1; return; })
        .end().catch((e) => { i = this.datasetStage1.length + 1; this.resetAll(); console.log('promise interrupted ANIME A'), e })


      if (this.datasetStage1[i] === 0 && currRect.attr('isDuplicate')) // trigger second loop Loop
        await this.checkZeros(i, coords).catch((e) => {
          console.log('Promise Interrupted in _animateStage1(): ', e); i = this.datasetStage1.length + 1; this.resetAll();;
        })
    }
  }
  async animateStage1() {
    await this._animateStage1().catch(e => console.log(e));
    this.Stage1i = 0
    //this.updateStage1();
  }
  /// STAGE 1 Helper Methods
  stopAnimation() {
    this.totalZerosStage1 = 0;

    d3.select(`#${this.svgStage1}`).selectAll('*').interrupt()
    d3.select(`#${this.svgStage1}`).selectAll('g').remove()
    this.updateStage1();
    this.isPlayingAnimation = false;
    this._buttons = false;
  }
  async checkZeros(index: number, coords: any[]) {
    return new Promise(async (resolve, recject) => {
      if (index + this.totalZerosStage1 <= this.datasetStage1.length - 1) {
        await this.shiftElements(coords, index).then(async () => {
          await this.insertZeroStage1(coords, index);
        })
          .catch(e => { recject(e); })
      }
      setTimeout(resolve, 0)
    })
  }
  async shiftElements(coords: any[], index: number) {
    return new Promise(async (resolve, reject) => {
      let n = this.datasetStage1.length - 1;
      let len = this.datasetStage1.length;

      let _ = d3.select(`#group-${len - this.totalZerosStage1}`)
        .transition().duration(200).attr('opacity', 0)//.remove()

      for (let j = n - this.totalZerosStage1; j > index; j--) { // Secondary Loop
        this.currentJ = j;

        let prevRect = d3.select(`#rect${j}-${this.datasetStage1[j]}`);
        let prevText = d3.select(`#text${j}-${this.datasetStage1[j]}`);

        await Promise.all([
          prevRect.transition().duration(200)
            .attr('fill', '#fcba03') // yellow
            .attr('x', () => {
              return coords[j + this.totalZerosStage1].rectX
            })
            .transition().duration(200)
            .attr('fill', '#bbb').end(), // grey

          prevText.transition().duration(200)
            .attr('x', () => {
              return coords[j + this.totalZerosStage1].textX
            })
            .transition().duration(200)
        ]).catch((e) => {

          j = 0;
          reject(e);
        })

      }
      setTimeout(resolve, 200)
    })
  }
  async insertZeroStage1(coords: any[], index: number) {
    return Promise.all([
      d3.select(`#${this.svgStage1}`).append('g')
        .append('rect')
        .attr('class', 'element-shape')
        .attr('width', 28)
        .attr('height', 40)
        .attr('id', () => `rect${index + this.totalZerosStage1}-0-stage1`)
        .attr('y', 15)
        .attr('x', () => {
          return coords[index + this.totalZerosStage1].rectX
        })
        .attr('fill', () => {
          if (this.Stage1i === this.datasetStage1.length + 1) return '#bbb'
          return 'cornflowerblue'
        })
        .attr('T', true)
        .attr('stroke', 1)
        .attr('stroke-width', 1)
        .attr('opacity', 0)
        .transition().duration(200).attr('opacity', 1),

      d3.select(`#${this.svgStage1}`).append('g')
        .append('text')
        .attr('class', 'element-text')
        .text('0')
        .attr('T', true)
        .attr('id', () => `text${index}-0}-stage1`)
        .attr('x', () => {
          return coords[index + this.totalZerosStage1].textX
        })
        .attr('y', 40)
        .attr('opacity', 0)
        .transition().duration(200).attr('opacity', 1)

    ]).catch((e) => { console.log('insertZeros promise') })

  }
  //// BEGIN STAGE 2 ANIMATION METHODS
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
            .attr('id', (_d: any, i: any) => `group-${i}-stage2`)
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
  async stopAnimationStage2() {
    this.totalZerosStage2 = 0;
    d3.select(`#${this.svgStage2}`).selectAll('*').interrupt()
    this.updateStage2();
    this.isPlayingAnimationStage2 = false;
  }
  async animateStage2() {
    await this._animateStage2();
    this._buttonsStage2 = false

  }
  /// STAGE 2 Animation
  async _animateStage2() {
    this._buttonsStage2 = true;
    this.isPlayingAnimationStage2 = true;
    await this.firstPassStage2().catch(_e => { console.log('Promise Interrupted') })
    await this.secondPassStage2().catch(_e => { console.log('Promise Interrupted') })
    await this.timeout(500) // time between each iteration
  }
  /// STAGE 2 Helper Methods
  async firstPassStage2() {
    let n = this.datasetStage2.length - 1;
    this.totalZerosStage2 = 0;
    this.currentJStage2 = 0;

    for (let i = 0; i <= n; i++) {  // begin animation loop
      let curr = `#rect${i}-${this.datasetStage2[i]}-stage2`
      this.currentIStage2 = i

      await d3.select(curr)
        .transition()
        .duration(200)
        .attr('fill', (_data: any, index: any, nodes: any) => {
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

    }
  }
  async secondPassStage2() {
    return new Promise(async (resolve, _reject) => {
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

        // Start backwards from the last element and begin writing over old values
        for (let j = last; j >= 0; j--) {
          this.currentJStage2 = j

          await this.insertAnimation(j, coords)

          if (this.totalZerosStage2 === 0) break;
        }
        resolve(true)

      }
    }).catch(e => console.log(e))
  }
  updateAwait() {
    return new Promise((resolve) => {
      this.updateStage2();
      resolve(true)
    })
  }
  insertAnimation(index: number, coords: any[]) {
    return new Promise(async (resolve, _reject) => {
      let lastRect = d3.select(`#rect${index}-${this.datasetStage2[index]}-stage2`)
      let lastText = d3.select(`#text${index}-${this.datasetStage2[index]}-stage2`)

      if (this.datasetStage2[index] === 0 && lastRect.attr('duplicate')) {
        await this.insertZero(index, coords)
        this.totalZerosStage2--;
      }
      // interrupt code below not used, but cool idea to store animation stat in localstorage for pause/resume functionallity
      lastRect.transition().duration(400).attr('x', coords[index + this.totalZerosStage2].rectX)
        .on('interrupt', (_: any, index: any, nodes: any) => {
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
        .attr('id', () => `rect${index + this.totalZerosStage2}-0-stage2`)
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
