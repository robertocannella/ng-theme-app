import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SortingAlgorithms } from './SortingAlgorithms';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as d3Transform from 'd3';
interface Color {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.sass']
})
export class ArrayComponent implements OnInit {

  title = 'Array';
  svg: any;
  ce: any[] = [];


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
  _showIndex: boolean = true;
  _buttons: boolean = true;
  allPromises: any = [];
  _mergeCount: number = 0;
  toggleGroupSelectedVal: string = 'show-off'
  animationColor = 'blue';
  colors: Color[] = [
    { value: 'blue', viewValue: 'Blue' },
    { value: 'red', viewValue: 'Red' },
    { value: 'green', viewValue: 'Green' },
    { value: 'random', viewValue: 'Surprise Me!' },
  ];


  constructor() { }

  ngOnInit(): void {
    this.addInitialElements(20);
    this.buildSVG2();
  }
  setColor(e: any) {

    if (e === 'random')
      e = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.animationColor = e;
    let groups = this.svg.select('svg#array-elements').selectAll('g').remove();
    this.update(this.ce);
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
            //console.log(event.transform)
            // ALLOWS TO RESET ZOOM PROGRAMATICALLY
            // remove anonymous function
            //d3.select(this).transition().delay(500).call(event.target.transform, d3.zoomIdentity)
            let vectorPan = event.transform
            this.panX = vectorPan.x;
            this.panY = vectorPan.y;
            this.panScale = vectorPan.k;
            //console.log(this.panX, this.panY, this.panScale)

          }
        })
      )
    this.update(this.ce);

  }
  update(arr: number[]) {



    let xScale = d3.scaleLinear()
      .domain([0, 50])  // default to 50
      .range([-100, 550])

    let groups = this.svg.select('svg#array-elements').selectAll('g')
      .data(arr, (data: any, index: any, nodes: any) => data)
      .enter()
      .append('g')
      // .join('g')
      .attr('id', (d: any, i: any) => 'group' + i + '-' + d)
      .each((data: any, i: any, nodes: any) => {
        let node = d3.select(nodes[i])
        node
          .on('click', () => {
            //console.log(data) //, this.d3zoom)
          })
      })

    groups
      .append('rect')
      .attr('width', 10)  // default to 10
      .attr('height', 75)
      .classed('element', true)
      .attr('class', 'element')
      .attr('y', 50)
      .attr('fill', 'white')
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
      .attr('x', (d: any, i: any) => xScale(i.toString()))
      .attr('fill', this.animationColor)
      .attr('fill-opacity', (d: any) => d / 150 + .05)
      .attr('id', (d: any, i: any) => 'rect' + d)
      .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)


    // groups
    //   .append('text')
    //   .text((d: any) => d)
    //   .attr('alignment-baseline', 'central')
    //   .attr('text-anchor', 'middle')
    //   .attr('class', 'element-value')
    //   .attr('id', (d: any, i: any) => 'text' + d)
    //   .attr('x', (d: any, i: any) => xScale(i.toString()) + 25)
    //   .attr('y', 75)
    //   .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)

    // this.showIndex();
  }
  showIndex() {
    let xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([-100, 550])

    let groups = this.svg.select('svg#array-elements').selectAll('g')
    if (this._showIndex) {
      d3.selectAll('.index').remove();


      groups
        .append('text')
        .attr('class', 'element-index')
        .text((d: any, i: any) => i)
        .attr('id', (d: any) => 'element-' + d + '-index')
        .attr('class', 'index')
        .attr('text-anchor', 'middle')
        .attr('opacity', '1')
        .attr('alignment-baseline', 'central')
        .attr("x", (d: any, i: any) => xScale(i.toString()) + 25)
        .attr("y", 40)
        .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)

    }
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
    this.svg.select('svg#array-elements').selectAll('g').remove();
    this.ce = []
    //this.update();
  }
  addInitialElements(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      let value = this.randomIntFromInterval(0, 99)

      while (this.ce.includes(value))
        value = this.randomIntFromInterval(1, 99)

      this.ce.push(value)
    }
  }
  addRandomElement() {
    if (this.ce.length > 98)
      return;

    let value = this.randomIntFromInterval(0, 99)

    while (this.ce.includes(value))
      value = this.randomIntFromInterval(1, 99)

    this.ce.push(value)
    this.update(this.ce);
  }

  async shuffle() {

    this.toggleButtons();
    for (var i = 0; i < this.ce.length - 1; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      // for (var i = this.ce.length - 1; i > 0; i--) {
      //   var j = Math.floor(Math.random() * (i + 1));

      await this.swapAnimation(this.ce[i], i, this.ce[j], j, 40, 0)

      var temp = this.ce[i];
      this.ce[i] = this.ce[j];
      this.ce[j] = temp;
    }
    this.toggleButtons();
  }

  async mergeSort() {
    this.allPromises = [];
    //console.log(`this.ce = [${this.ce}]`)
    this._mergeSort(this.ce, 0, this.ce.length - 1)

    //console.log(this.allPromises)
    for (let promise of this.allPromises) {
      await this.replaceAnimation(promise.array1, promise.array2, promise.mainArray);
    }
    this.allPromises = [];

  }
  async _mergeSort(array: number[], lo: number, hi: number) {

    if (hi <= lo) return

    let mid: number = lo + Math.floor((hi - lo) / 2);
    this._mergeSort(array, lo, mid);
    this._mergeSort(array, mid + 1, hi);
    await this._merge(array, lo, mid, hi);
  }

  async _merge(array: number[], lo: number, mid: number, hi: number) {
    let aux: number[] = [];
    let i: number = lo;
    let j: number = mid + 1;

    for (let k = lo; k <= hi; k++)
      aux[k] = array[k];

    for (let m = lo; m <= hi; m++) {
      if (i > mid) {
        this.allPromises.push({ array1: array[m], index1: m, array2: aux[j], index2: j, duration: 400, delay: 500, mainArray: [...array] });
        array[m] = aux[j];
        j++;
      }
      else if (j > hi) {
        this.allPromises.push({ array1: array[m], index1: m, array2: aux[i], index2: i, duration: 400, delay: 500, mainArray: [...array] });
        array[m] = aux[i]
        i++;
      }
      else if (aux[j] < aux[i]) {
        this.allPromises.push({ array1: array[m], index1: m, array2: aux[j], index2: j, duration: 400, delay: 500, mainArray: [...array] });
        array[m] = aux[j];
        j++;

      }
      else {
        this.allPromises.push({ array1: array[m], index1: m, array2: aux[i], index2: i, duration: 400, delay: 500, mainArray: [...array] });
        array[m] = aux[i];
        i++;
      }
    }
    this.allPromises.push({ array1: 0, index1: 0, array2: 0, index2: 0, duration: 400, delay: 500, mainArray: [...this.ce] });
  }

  async shellSort() {
    let window = d3.select('svg#array-elements')
    window.select('.sort-detail').remove();
    window
      .append('text')
      .text('1')
      .attr('alignment-baseline', 'central')
      .attr('text-anchor', 'middle')
      .attr('class', 'sort-detail')
      .attr('x', -80)
      .attr('y', 25)
      .attr('transform', `translate(${this.panX},${this.panY}) scale(${this.panScale}, ${this.panScale})`)


    this.toggleButtons();
    let n = this.ce.length;
    let h = 1;
    while (h < n / 3)
      h = Math.floor(3 * h + 1); // 1, 4,13,40,121,363,1093

    while (h >= 1) { // h-sort the array
      window.select('.sort-detail')
        .text(() => `h =  ${h}`)
      for (let i = h; i < n; i++) {
        for (let j = i; j >= h && this.less(this.ce[j], this.ce[j - h]); j -= h) {

          await this.swapAnimation(this.ce[j], j, this.ce[j - h], j - h, 100, 0)
          this.exchange(this.ce, j, j - h);

        }
      }
      h = Math.floor(h / 3);
    }
    window.select('.sort-detail')
      .transition()
      .duration(299)
      .remove();
    this.toggleButtons();
    this.update(this.ce);

  }
  async insertionSort() {
    this.toggleButtons();
    let n = this.ce.length;

    for (let i = 0; i < n; i++) {
      for (let j = i; j > 0 && this.less(this.ce[j], this.ce[j - 1]); j--) {

        await this.swapAnimation(this.ce[j], j, this.ce[j - 1], j - 1, 100, 0)
        this.exchange(this.ce, j, j - 1);
      }
    }
    this.toggleButtons();
    this.update(this.ce);

  }
  async selectionSort() { // Sort a[] into increasing order
    this.toggleButtons();
    let n = this.ce.length;

    for (let i = 0; i < n; i++) {           // exchange a[i] with the smallest entry in a[i], ... , a[n-1].
      let min = i;                        // index of a minimal entry
      for (let j = i + 1; j < n; j++)  // we are comparing with the next element  a[i + 1]
        if (this.less(this.ce[j], this.ce[min])) min = j;


      await this.swapAnimation(this.ce[i], i, this.ce[min], min, 200, 0);
      this.exchange(this.ce, i, min);

    }
    this.toggleButtons();
    this.update(this.ce);
  }

  async bubbleSort() {
    this.toggleButtons()
    let isSorted;
    do {

      isSorted = true;
      for (let j = 0; j < this.ce.length - 1; j++) {
        if (this.ce[j] > this.ce[j + 1]) {
          let temp = this.ce[j]
          this.ce[j] = this.ce[j + 1]
          this.ce[j + 1] = temp
          isSorted = false;
          await this.swapAnimation(this.ce[j], j, this.ce[j + 1], j + 1, 100, 0)
        }

      }
    } while (!isSorted)

    this.toggleButtons()
    this.update(this.ce);
  }
  async replaceAnimation(array1: any, array2: any, mainArray: number[]) {
    let groups = this.svg.select('svg#array-elements').selectAll('g')

    return Promise.all([
      groups.remove(),

      this.update(mainArray),

      groups
        .transition()
        .duration(25)
        .end()
    ])

  }
  swapAnimation(d: any, i: any, d1: any, i1: any, durationTime: number, delayTime: number) {


    // let textSel = `#text${d}`;
    // let textSel1 = `#text${d1}`;
    let rectSel = `#rect${d}`;
    let rectSel1 = `#rect${d1}`;
    // console.log(textSel, textSel1, rectSel, rectSel1)


    // let textSelX = d3.select(textSel).attr('x');
    // let textSel1X = d3.select(textSel1).attr('x');
    let rectSelX = d3.select(rectSel).attr('x');
    let rectSel1X = d3.select(rectSel1).attr('x');
    if (rectSel1 === rectSel)     // added this for section sort error on duplicate tags
      return;

    return Promise.all([


      // d3.select(textSel)
      //   .transition()
      //   .duration(durationTime)
      //   .delay(delayTime)
      //   .attr('x', textSel1X)
      //   .end().catch(error => console.log(error)),

      // d3.select(textSel1)
      //   .transition()
      //   .duration(durationTime)
      //   .delay(delayTime)
      //   .attr('x', textSelX)
      //   .end().catch(error => console.log(error)),

      d3.select(rectSel)
        .transition()
        .duration(durationTime)
        .delay(delayTime)
        .attr('x', () => {
          //console.log('3rd')
          return rectSel1X;
        })
        // .attr('fill', 'grey')
        // .transition()
        // .duration(100)
        // .attr('fill', 'orange')
        .end().catch(error => console.log(error)),

      d3.select(rectSel1)
        .transition()
        .duration(durationTime)
        .delay(delayTime)
        .attr('x', rectSelX)
        // .attr('fill', 'grey')
        // .transition()
        // .duration(100)
        // .attr('fill', 'orange')
        .end().catch(error => console.log(error))


    ]).catch(error => {
      console.log(error.message)
    })

  }
  // --- UTILTIY FUNCTIONS ---- //
  playAnimation() {
    this.toggleButtons();

    this.toggleButtons();
  }
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
  exchange(arr: number[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  less(v: number, w: number) {
    return v < w;
  }
}
