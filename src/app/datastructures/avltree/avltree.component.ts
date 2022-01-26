import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { AVLTree } from '../AVLTree';
import { AVLNode } from '../AVLNode';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSlider, MatSliderChange } from '@angular/material/slider';




@Component({
  selector: 'app-avltree',
  templateUrl: './avltree.component.html',
  styleUrls: ['./avltree.component.sass']
})
export class AVLTreeComponent implements OnInit, AfterViewInit {



  public title = 'AVL Tree';
  private width = 800;
  private height = 400;
  private vbWidth = 900;
  private vbHeight = 250;
  private radius = 12;
  private totalShift = 75;

  private xmlns = 'http://www.w3.org/2000/svg';
  private svgId = 'avlnodes';
  private detailOffsetXY = 18;



  currentImbalance: any;
  public avlTree = new AVLTree(this.vbWidth, this.radius, this.totalShift);
  private currentSelection: any;
  private currentNodes = new Set<number>();
  svg: any;
  edges = true;
  _showHeight = false;
  _showBalance = false;

  // Sliders
  // Radisu
  radiusMax = 20;
  radiusMin = 1;
  radiusValue = this.radius;
  // Wingspan
  wingspanMax = 300;
  wingspanMin = 0;
  wingspanValue = this.totalShift;

  // Zoom
  zoomMax = 1900;
  zoomMin = 300;
  zoomValue = this.vbWidth;

  // Y-axis
  yAxisMax = 600;
  yAxisMin = 200;
  yAxisValue = 250;



  autoTicks = false;
  disabled = false;
  invert = false;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  vertical = false;
  tickInterval = 1;


  control = new FormGroup({
    addNode: new FormControl([this.randomIntFromInterval(1, 99), '']),
  });
  public ngAfterViewInit() {

    // Get the input field
    var input: any = document.getElementById("addNode");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event: any) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click

        document.getElementById("addNode")?.click()

      }
    });

    let x: any = document.getElementById('mainsvg')

    x.scrollTo({
      top: 0,
      left: (this.vbWidth / 5.5),
      behavior: 'smooth'
    })
  }
  public ngOnInit(): void {
    this.svg = d3.select('div#mainsvg')
    this.avlTree.insert(33);
    this.avlTree.insert(32);
    this.avlTree.insert(34);
    this.buildSvg();
    this.showTree();
    //this.addZoom();

  }

  public onSubmit() {
    this.addNode(this.control.value.addNode)
  }
  private buildSvg() {

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

    if (cn!.length > 1)
      d3.selectAll('.node-array').remove();

    // paint all edges first so Z-indexing is correct
    this.showEdges()


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
            this.control.setValue({ addNode: d.value })
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
          .attr('stroke-width', '2px')
          .attr('cy', () => d.currentY)
          .attr('cx', () => d.currentX)
          .attr('id', () => 'node' + d.value)
          .text(() => d.value)
          .on('click', () => {
            console.log(d)
          })
        node.select("text")
          .text((d: any) => d.value)
          .attr('alignment-baseline', 'central')
          .attr('text-anchor', 'middle')
          .attr('id', (d: any) => 'node' + d.value + 'text')
          .attr('x', (d: any) => d.currentX)
          .attr('y', (d: any) => d.currentY)
      }).on('end', () => {
        //toggleEdges()
      })

    this.showHeight();
    this.showBalance();
  }
  traverse() {
    let cn = this.avlTree.preOrderArray()
    if (cn == null || undefined)
      return;

    cn.forEach((element, index) => {

      d3.select('#node' + element.value)
        .transition()
        .duration(500)
        .delay(500 * index)
        .attr('r', element.radius * 1.1)
        .attr('stroke', 'purple')
        .attr('fill', 'pink')
    });

  }
  obliterate() {

    this.avlTree = new AVLTree(this.vbWidth, this.radius, this.totalShift);
    d3.selectAll('svg g').remove();
    d3.selectAll('svg line').remove();
    this.currentNodes.clear()
  }
  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  public addNode(valueString: string) {

    let value = parseInt(valueString)

    while (this.currentNodes.has(value))
      value = this.randomIntFromInterval(1, 99)

    this.control.setValue({ 'addNode': value })
    //nodeInput.value = value;
    this.avlTree.insert(value);

    let newNode = this.avlTree.findNode(value)


    this.currentSelection = value;
    this.currentNodes.add(newNode!.value)

    //sliderX.value = newNode.currentX
    //sliderY.value = newNode.currentY


    this.showTree();
    //this.showBalance();
    this.checkBalance();

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

  toggleEdges() {
    this.edges = !this.edges;
    let edges = this.edges;

    let cn = this.avlTree.preOrderArray();

    d3.selectAll('line')
      .data(cn!)
      .each(function (d, i) {
        const edge = d3.select(this);
        edge
          .attr('x1', (d: any) => d.parentX)
          .attr('y1', (d: any) => d.parentY)
          .each((d) => {
            if (edges) {
              edge
                .transition()
                .duration(1000)
                .attr('x2', (d: any) => d.currentX)
                .attr('y2', (d: any) => d.currentY)
            }
            else {
              edge
                .transition()
                .duration(1000)
                .attr('x2', (d: any) => d.parentX)
                .attr('y2', (d: any) => d.parentY)
            }
          })

      })
  }
  showEdges() {
    let cn = this.avlTree.preOrderArray();
    let display = d3.select('svg#avlnodes')


    display.selectAll('g')
      .data(cn!)
      .enter()
      .append('line')
      .attr('x1', (d: any) => d.parentX)
      .attr('y1', (d: any) => d.parentY)
      .attr('x2', (d: any) => d.currentX)
      .attr('y2', (d: any) => d.currentY)
      .attr('class', 'node-array')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('id', (d: any) => 'node' + d.value + 'edge')

  }
  changeTotalShift(newTotalShift: number | null) {
    // WingSpan

    this.totalShift = newTotalShift!;
    let cn = this.avlTree.preOrderArray();

    this.avlTree = new AVLTree(this.vbWidth, this.radius, newTotalShift!);
    d3.selectAll('svg g').remove();

    cn!.forEach((node) => {
      this.avlTree.insert(node.value)
    });
    // currentNodes.clear();
    this.showTree();

  }
  changeViewBoxHeight(slider: MatSliderChange) {
    // Y-axis
    this.vbHeight = slider.value!;
    let vb = document.getElementById(`${this.svgId}`)

    vb!.setAttribute('viewBox', `0 0 ${this.vbWidth} ${this.vbHeight}`)
    this.showTree();
  }

  changeViewBoxWidth(value: number | null): void {
    // Zoom

    let viewBox = document.getElementById(`${this.svgId}`)
    this.vbWidth = value!;
    let cn = this.avlTree.preOrderArray();

    this.avlTree = new AVLTree(this.vbWidth, this.radius, this.totalShift);
    d3.selectAll('svg g').remove();

    cn!.forEach((node) => {
      this.avlTree.insert(node.value)
    });
    //currentNodes.clear();
    viewBox!.setAttribute('viewBox', `0 0 ${this.vbWidth} ${this.vbHeight}`)
    this.showTree();
  }
  changeRadius(value: any) {
    var newRadius = parseInt(value);

    this.radius = newRadius;
    this.avlTree.changeRadius(newRadius);
    this.showTree();
  }

  toggleToFalse() {
    d3.selectAll('.balance').remove();
    d3.selectAll('.node-height').remove();
    this._showBalance = false;
    this._showHeight = false;
    this.showTree();
  }
  toggleShowBalance() {
    this._showBalance = true;
    this._showHeight = false;
    this.showTree();
  }
  toggleShowHeight() {
    this._showHeight = true;
    this._showBalance = false;
    this.showTree();
  }
  showHeight() {


    if (this._showHeight) {
      d3.selectAll('.balance').remove();
      d3.selectAll('.node-height').remove();
      let cn = this.avlTree.preOrderArray();

      this.svg.selectAll('g')
        .data(cn)
        .append('text')
        .attr('class', 'node-height')
        .text((d: any, i: any) => d.height)
        .attr('id', (d: any) => 'node' + d.value + 'node-height')
        .attr('text-anchor', 'middle')
        .attr('opacity', '1')
        .attr('alignment-baseline', 'central')
        .attr("x", (d: any) => d.currentX + this.detailOffsetXY)
        .attr("y", (d: any) => d.currentY + this.detailOffsetXY)
    }

  }
  showBalance() {

    if (this._showBalance) {
      d3.selectAll('.balance').remove();
      d3.selectAll('.node-height').remove();
      let cn = this.avlTree.preOrderArray();

      this.svg.selectAll('g')
        .data(cn)
        .append('text')
        .attr('class', 'balance')
        .text((d: any, i: any) => this.avlTree._balanceFactor(d))
        .attr('id', (d: any) => 'node' + d.value + 'balance-factor')
        .attr('text-anchor', 'middle')
        .attr('opacity', '1')
        .attr('alignment-baseline', 'central')
        .attr("x", (d: any) => d.currentX + this.detailOffsetXY)
        .attr("y", (d: any) => d.currentY + this.detailOffsetXY)
    }
  }
  // balancing here
  balance(node: AVLNode) {

    let buttons = document.querySelectorAll('button'); // Disable all the buttons
    buttons.forEach((button) => {
      button.disabled = true;
    })
    // if (this._showBalance)
    //     this.toggleShowBalance();


    if (this.avlTree._isRightHeavy(node)) {
      //console.log(node.value + ' is right heavy, perform a LEFT rotation')

      let oldTreeValues = this.avlTree.preOrderValues(this.avlTree.root)



      let oldAVLTree = new AVLTree(this.vbWidth, this.radius, this.totalShift);
      oldTreeValues!.forEach((value) => {
        oldAVLTree.insert(value)
      })

      let newRoot = this.avlTree.balance(this.avlTree.findNode(node.value)!)
      let newTreeValues = this.avlTree.preOrderValues(newRoot)

      let newTree = this.rotateLeft(node.value, oldAVLTree, oldTreeValues)
      this.avlTree = new AVLTree(this.vbWidth, this.radius, this.totalShift);

      newTree.forEach((value: any) => {
        this.avlTree.insert(value)
      })
      newTree = this.avlTree.preOrderArray();
      newTree.forEach((element: any) => {

        let node = d3.select('#node' + element.value)
        node
          .transition()
          .duration(1000)
          .delay(500)
          .attr('cy', element.currentY)
          .attr('cx', element.currentX)
          .each((d: any) => {
            if (this.currentImbalance === null)
              throw null;;

            if (d.value == this.currentImbalance.value)
              node.transition()
                .duration(1000)
                .delay(500)
                .attr('fill', 'pink')
                .attr('cy', element.currentY)
                .attr('cx', element.currentX)
                .transition()
                .duration(500)
                .attr('fill', 'white')
          })
        let label = d3.select('#node' + element.value + 'text')
        label
          .transition()
          .duration(1000)
          .delay(500)
          .attr('y', element.currentY)
          .attr('x', element.currentX)
          .on('end', () => {
            this.currentImbalance = null;
            this.checkBalance()
            buttons.forEach((button) => {
              button.disabled = false;
            })
          })
        let edge = d3.select('#node' + element.value + 'edge')
        edge
          .transition()
          .duration(1000)
          .delay(500)
          .attr('x1', element.parentX)
          .attr('y1', element.parentY)
          .attr('x2', element.currentX)
          .attr('y2', element.currentY)
          .on('end', () => {
            buttons.forEach((button) => {
              button.disabled = false;
            })
          })
      })

    }

    if (this.avlTree._isLeftHeavy(node)) {
      //console.log(node.value + ' is left heavy, perform a RIGHT rotation')
      let oldTree = this.avlTree.preOrderArray()

      this.avlTree._rotateRight(node)


      let rootIndex = oldTree!.indexOf(node);

      let newTree = this.rotateRight(rootIndex, oldTree)
      this.avlTree = new AVLTree(this.vbWidth, this.radius, this.totalShift);

      newTree.forEach((node: AVLNode) => {
        this.avlTree.insert(node.value)
      })
      newTree = this.avlTree.preOrderArray();
      newTree.forEach((element: AVLNode) => {


        let node = d3.select('#node' + element.value)
        node
          .transition()
          .duration(1000)
          .delay(500)
          .attr('cy', element.currentY)
          .attr('cx', element.currentX)
          .each((d: any) => {
            if (d.value == this.currentImbalance.value)
              node.transition()
                .duration(1000)
                .delay(500)
                .attr('fill', 'lightblue')
                .attr('cy', element.currentY)
                .attr('cx', element.currentX)
                .transition()
                .duration(500)
                .attr('fill', 'white')
          })
        let label = d3.select('#node' + element.value + 'text')
        label
          .transition()
          .duration(1000)
          .delay(500)
          .attr('y', element.currentY)
          .attr('x', element.currentX)
          .on('end', () => {
            this.currentImbalance = null;
            this.checkBalance()
            buttons.forEach((button) => {
              button.disabled = false;
            })
          })
        let edge = d3.select('#node' + element.value + 'edge')
        edge
          .transition()
          .duration(1000)
          .delay(500)
          .attr('x1', element.parentX)
          .attr('y1', element.parentY)
          .attr('x2', element.currentX)
          .attr('y2', element.currentY)
          .on('end', () => {
            buttons.forEach((button) => {
              button.disabled = false;

            })
          })
      })
    }
  }
  rotateRight(index: any, arr: any) {
    let oldRoot = arr[index]
    let newRoot = arr[index + 1]
    let sibling = arr[index + 2]

    arr[index] = newRoot
    arr[index + 1] = sibling
    arr[index + 2] = oldRoot

    return arr;
  }
  rotateLeft(nodeValue: any, oldTree: AVLTree, oldTreeValues: any) {
    let root = oldTree.findNode(nodeValue)
    let newRoot = root!.rightChild
    let rootRightChild = newRoot!.leftChild;
    let newRootLeftChild = root;

    let rootIndex = oldTreeValues.indexOf(nodeValue);
    let newRootIndex = oldTreeValues.indexOf(root!.rightChild!.value)
    let rootRightChildIndex = (newRoot!.leftChild) ? oldTreeValues.indexOf(newRoot!.leftChild.value) : -1
    let newRootLeftChildIndex = oldTreeValues.indexOf(root!.value)

    let temp = oldTreeValues[rootIndex]
    oldTreeValues[rootIndex] = oldTreeValues[newRootIndex]
    oldTreeValues[newRootIndex] = temp


    return oldTreeValues;
  }
  checkBalance() {
    let cn = this.avlTree.preOrderArray()

    cn!.forEach((element, index) => {
      if (this.avlTree._isLeftHeavy(element) || this.avlTree._isRightHeavy(element))
        this.currentImbalance = element;
    });

    if (this.currentImbalance) {
      this.balance(this.currentImbalance)
      //console.log('Node: ', currentImbalance.value, ' is imbalanced.')
    }
  }
}


