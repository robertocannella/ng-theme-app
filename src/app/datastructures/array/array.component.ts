import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.sass']
})
export class ArrayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  //  ///////////   appending DOM instead of replacing all elemtents : 

  //  buildSVG2() {
  //   this.svg2 = d3.select('div#secondary-svg')
  //   this.cn = this.avlTree.preOrderArray()

  //   this.svg2
  //     .append("svg")
  //     .attr('viewBox', `0 0 ${this.vbWidth} ${this.vbHeight}`)
  //     .attr('width', `${this.width}`)
  //     .attr('height', this.height)
  //     .attr('id', 'svg2')
  //     .attr('xmlns', this.xmlns)
  //     .call(this.d3zoom.on("zoom", (event: any) => this.zoom(event)))

  //   this.update();
  // }

  // update() {

  //   this.svg2.select('svg').selectAll('circle').remove()

  //   this.svg2.select('svg')
  //     .selectAll('circle')
  //     .data(this.cn)
  //     .enter()
  //     .append('circle')
  //     .on('click', (event: PointerEvent) => {
  //       console.log('x: ', event.clientX, 'y: ', event.clientY)
  //     })
  //     .each((data: any, i: any, n: any) => {
  //       let node = d3.select(n[i])
  //       node.on('click', (d) => console.log(data, d.clientX, d.clientY))
  //     })
  //     .attr('fill', 'white')
  //     .attr('stroke-width', 2)
  //     .attr('stroke', 'black')
  //     .attr('class', 'circle2')
  //     .attr('cx', (d: any) => {
  //       console.log('Node: ', d.value, ' currentX: ', d.currentX, ' currentY: ', d.currentY, ' panX: ', this.panX, ' total: ', this.panX - d.currentX)
  //       return d.currentX + this.panX;
  //     })
  //     .attr('cy', (d: any) => d.currentY + this.panY)
  //     .attr('r', (d: any) => (d.radius) * this.scale)

  //   //.attr('transform', `translate(${this.panX},${this.panY})`)

  // }
  // addSVGNode() {
  //   let value = this.randomIntFromInterval(0, 99);

  //   this.avlTree.insert(value)
  //   this.cn?.push(this.avlTree.findNode(value)!)

  //   this.svg2.select('svg')
  //     .selectAll('cirlce')
  //     .data(this.cn)
  //     .enter()
  //     .append('circle')
  //     .on('click', (event: PointerEvent) => {
  //       console.log('x: ', event.clientX, 'y: ', event.clientY)
  //     })
  //     .each((data: any, i: any, n: any) => {
  //       let node = d3.select(n[i])
  //       node.on('click', (d) => console.log(data, d.clientX, d.clientY))
  //     })
  //     .attr('fill', 'white')
  //     .attr('stroke-width', 2)
  //     .attr('stroke', 'black')
  //     .attr('class', 'circle2')
  //     .attr('cx', (d: any) => {
  //       console.log('Node: ', d.value, ' currentX: ', d.currentX, ' currentY: ', d.currentY, ' panX: ', this.panX, ' total: ', this.panX - d.currentX)
  //       return d.currentX + this.panX;
  //     })
  //     .attr('cy', (d: any) => d.currentY + this.panY)
  //     .attr('r', (d: any) => (d.radius) + this.scale)

  //   this.update()
  // }
  // zoom(e: any) {

  //   let svgNode = d3.selectAll('#svg2 circle')
  //   svgNode.attr('transform', e.transform)


  //   //var circles = d3.select('#svg2').selectAll('.circle2')
  //   this.panVector = e.transform
  //   this.panX = this.panVector.x
  //   this.panY = this.panVector.y
  //   this.scale = this.panVector.k

  //   // circles
  //   //   .attr('cy', (d: any) => (d.currentY) + this.panY)
  //   //   .attr('cx', (d: any) => (d.currentX) + this.panX)
  //   //   .attr('r', (d: any) => (d.radius) * this.scale)

  //   d3.select("#vec-scale-val-span")
  //     .text(`${this.scale}`)
  //   d3.select("#vec-scale-x-span")
  //     .text(`${this.panX}`)
  //   d3.select("#vec-scale-y-span")
  //     .text(`${this.panY}`)

  //   //this.update()
  // }
}
