import { Component, NgModule, OnInit } from '@angular/core';
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
export class AVLTreeComponent implements OnInit {



  public title = 'AVL Tree';
  private width = 800;
  private height = 200;
  private vbWidth = 600;
  private vbHeight = 250;
  private radius = 15;
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



  control = new FormGroup({
    addNode: new FormControl(''),
    changeRadius: new FormControl(''),
  });

  public ngOnInit(): void {
    this.svg = d3.select('div#mainsvg')
    console.log(this.avlTree)
    this.avlTree.insert(33);
    this.avlTree.insert(32);
    this.buildSvg();
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
      .attr('height', 400)
      .attr('id', this.svgId)
      .attr('xmlns', this.xmlns)
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
          //d3.select(this).append("line")
          d3.select(n[i]).append("circle");
          d3.select(n[i]).append("text");
        });
      })
      .attr("class", 'node-array')
      .style('cursor', 'pointer')
      .on('click', (d: any) => {

        this.currentSelection = d.value
        //this.sliderY.value = d.currentY;
        //sliderX.value = d.currentX;
        //this.addNode.value = d.value;

        console.log('X: ', d.currentX, 'Y: ', d.currentY, 'Node: ', d.value)
      })
      .each((d: AVLNode, i: any, nodes: any) => {
        const node = d3.select(nodes[i]);
        let n: any = nodes[i]
        node.select("circle")
          .attr("r", (d: any) => d.radius)
          .attr('fill', 'white')
          .attr('stroke', 'black')
          .attr('stroke-width', '1px')
          .attr('cy', (d: any) => d.currentY)
          .attr('cx', (d: any) => d.currentX)
          .attr('id', (d: any) => 'node' + d.value)
          .text((d: any) => d.value)
          .each((d) => {
            console.log(n.radius)
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
}


