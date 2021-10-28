import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CircleNode, CircleTree } from './CircleTree';

@Component({
  selector: 'app-datastructures',
  templateUrl: './datastructures.component.html',
  styleUrls: ['./datastructures.component.sass']
})
export class DatastructuresComponent {
  //<circle id="node-1" r="15" cx="20" cy="20" fill="white" stroke="midnightblue" stroke-width="3" />
  initialCount: number = 10;
  nodeTree: CircleTree = new CircleTree();
  circleNodeArray: CircleNode[] = [];
  traversePreOrderArray: CircleNode[] = [];
  constructor() {

  }
  isLeftHeavy(): boolean | undefined {
    if (this.nodeTree.root != undefined) {
      return this.nodeTree.isLeftHeavy(this.nodeTree.root);
    }
    return false;
  }
  isRightHeavy(): boolean | undefined {
    if (this.nodeTree.root != undefined) {
      return this.nodeTree.isRightHeavy(this.nodeTree.root);
    }
    return false;
  }

  setNodeXY() {
    var shiftRight = 100;
    var shiftLeft = 100;
    for (let index = 0; index < this.traversePreOrderArray.length; index++) {
      this.traversePreOrderArray[index].cx += shiftRight;
      console.log(this.traversePreOrderArray[index].cx);
    }
  }
  clearNodes() {
    this.traversePreOrderArray = [];
    this.circleNodeArray = [];
    this.nodeTree.root = undefined;
  }
  addCircleNode(value: string, cx: string, cy: string) {
    this.traversePreOrderArray = [];
    let i = parseInt(value)
    let x = parseInt(cx)
    let y = parseInt(cy)

    this.nodeTree.root = this.nodeTree.addNode(i, x, y);
    this.circleNodeArray.push(new CircleNode(i, x, y));

    // console.log("Initial Input Array");
    // console.log(this.circleNodeArray);
    // console.log(this.nodeTree);
    // console.log("Traversed Array");
    this.traversePreOrderArray = this.nodeTree.traversePreOrder(this.nodeTree.root, this.traversePreOrderArray);
    // console.log(this.traversePreOrderArray);


  }
  // convertToArray() {
  //   if (this.nodeTree.root != undefined) {
  //     console.log("tree is empty")


  //     this.traversePreOrder(this.nodeTree.root);
  //   }

  // }
  private traversePreOrder(root: CircleNode) {
    if (root != undefined) { }

    console.log(root.value)
    if (root.leftChild != undefined)
      this.traversePreOrder(root.leftChild);
    if (root.rightChild != undefined)
      this.traversePreOrder(root.rightChild);

    return;
  }

}
