import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { AVLTree } from '../AVLTree';
import { AVLNode } from '../AVLNode';
import { FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-avltree',
  templateUrl: './avltree.component.html',
  styleUrls: ['./avltree.component.sass']
})
export class AVLTreeComponent implements OnInit, AfterViewInit {



  public title = 'AVL Tree';
  private width = 800;
  private height = 400;
  private vbWidth = 600;
  private vbHeight = 250;
  private radius = 14;
  private totalShift = 75;

  private xmlns = 'http://www.w3.org/2000/svg';
  private svgId = 'avlnodes';
  private balanceOffsetXY = 18;
  private heightOffsetXY = 18; // x,y offset for label



  private showHeight = false;
  private _showBalance = false;
  private currentImbalance = null;
  public avlTree = new AVLTree(this.vbWidth, this.radius, this.totalShift);
  private currentSelection: any;
  private currentNodes = new Set<number>();
  private edges = true;
  public svg: any;

  // slider 
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 1200;
  min = 300;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 800;
  vertical = false;
  tickInterval = 1;


  control = new FormGroup({
    addNode: new FormControl(''),
    changeRadius: new FormControl(''),

  });
  public ngAfterViewInit() {
    let x: any = document.getElementById('mainsvg')

    console.log(this.vbWidth)
    x.scrollTo({
      top: 0,
      left: (this.vbWidth / 2) - 70,
      behavior: 'smooth'
    })
  }
  public ngOnInit(): void {
    this.svg = d3.select('div#mainsvg')
    console.log(this.avlTree)
    this.avlTree.insert(33);
    this.avlTree.insert(32);
    this.buildSvg();
    this.showTree();
    //this.addZoom();
  }

  public onSubmit() {
    this.addNode(this.control.value.addNode)
  }
  private buildSvg() {
    console.log(this.svg)
    this.svg
      .append("svg")
      .attr('viewBox', `0 0 ${this.vbWidth} ${this.vbHeight}`)
      .attr('width', `${this.width}`)
      .attr('height', this.height)
      .attr('id', this.svgId)
      .attr('xmlns', this.xmlns)
  }
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
  showTree() {
    let cn = this.avlTree.preOrderArray();
    console.log(cn);

    //if (cn!.length > 1)
    //  d3.selectAll('.node-array').remove();

    // paint all edges first so Z-indexing is correct
    //this.showEdges()


    // paint nodes and labels 
    let display = d3.select('svg#avlnodes')

    display.selectAll('g')
      .data(cn!)
      .join(function (enter: any) {
        return enter.append("g").each(function (d: any, i: any, n: any) {
          d3.select(n[i]).append("circle");
          d3.select(n[i]).append("text");
        });
      })

    display.selectAll('g')
      .data(cn!)
      .attr("class", 'node-array')
      .style('cursor', 'pointer')
      .each((d: AVLNode, i: any, n: any) => {
        const node = d3.select(n[i])
        node
          .on('click', () => {
            //this.sliderY.value = d.currentY;
            //sliderX.value = d.currentX;
            //this.addNode.value = d.value;
            console.log('X: ', d.currentX, 'Y: ', d.currentY, 'Node: ', d.value)
          })
      })
      .each((d: AVLNode, i: any, nodes: any) => {
        const node = d3.select(nodes[i]);
        let n: any = nodes[i]
        node.select("circle")
          .attr("r", () => d.radius)
          .attr('fill', 'white')
          .attr('stroke', 'black')
          .attr('stroke-width', '1px')
          .attr('cy', () => d.currentY)
          .attr('cx', () => d.currentX)
          .attr('id', () => 'node' + d.value)
          .text(() => d.value)
          .on('click', () => {
            console.log(d)
          })
        node.select("text")
          .call(() => { console.log('text') })
          .text((d: any) => d.value)
          .attr('alignment-baseline', 'central')
          .attr('text-anchor', 'middle')
          .attr('id', (d: any) => 'node' + d.value + 'text')
          .attr('x', (d: any) => d.currentX)
          .attr('y', (d: any) => d.currentY)
      }).on('end', () => {
        //toggleEdges()
      })

    //this.showBalance();
  }
  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  public addNode(valueString: string) {

    let value = parseInt(valueString)

    while (this.currentNodes.has(value))
      value = this.randomIntFromInterval(1, 99)

    //nodeInput.value = value;
    this.avlTree.insert(value);

    let newNode = this.avlTree.findNode(value)


    this.currentSelection = value;
    this.currentNodes.add(newNode!.value)

    //sliderX.value = newNode.currentX
    //sliderY.value = newNode.currentY


    this.showTree();
    //this.showBalance();
    //this.checkBalance();

  }
  addZoom() {
    const svgElement = document.querySelector('svg#avlnodes')
    if (svgElement?.getAttribute('viewBox') == null)
      alert('object null')
    else {
      var [, , originalWidth, originalHeight] = svgElement.getAttribute("viewBox")!.split(" ").map(Number);
    }
    svgElement!.addEventListener("mousemove", (event: any) => {
      const { top, left, width, height } = svgElement!.getBoundingClientRect();

      const eventTop = event.clientY - top;
      const eventLeft = event.clientX - left;

      svgElement!.setAttribute("viewBox", `${eventLeft / width * originalWidth - originalWidth / 4} ${eventTop / height * originalHeight - originalHeight / 4} ${originalWidth / 2} ${originalHeight / 2}`)
    });
    svgElement!.addEventListener("mouseout", () => {
      svgElement!.setAttribute("viewBox", `0 0 ${originalWidth} ${originalHeight}`);
    });
  }
  changeViewBoxWidth(value: number | null): void {
    // Zoom

    let viewBox = document.getElementById(`${this.svgId}`)
    this.vbWidth = value!;

    console.log(this.vbWidth)
    let cn = this.avlTree.preOrderArray();

    this.avlTree = new AVLTree(this.vbWidth, this.radius, this.totalShift);
    d3.selectAll('svg g').remove();

    cn!.forEach((node) => {
      this.avlTree.insert(node.value)
    });
    //currentNodes.clear();
    console.log(viewBox)
    viewBox!.setAttribute('viewBox', `0 0 ${this.vbWidth} ${this.vbHeight}`)
    this.showTree();
  }


}


