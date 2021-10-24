import { Component, OnInit } from '@angular/core';
import { CircleNode, CircleTree } from './CircleTree';

@Component({
  selector: 'app-datastructures',
  templateUrl: './datastructures.component.html',
  styleUrls: ['./datastructures.component.sass']
})
export class DatastructuresComponent {
  //<circle id="node-1" r="15" cx="20" cy="20" fill="white" stroke="midnightblue" stroke-width="3" />

  nodeTree: CircleTree = new CircleTree();
  circleNodeArray: CircleNode[] = [];
  constructor() {

  }


  addCircleNode(value: string, cx: string, cy: string) {
    let i = parseInt(value)
    let x = parseInt(cx)
    let y = parseInt(cy)
    this.nodeTree.root = this.nodeTree.addNode(i, x, y)
    console.log(this.nodeTree);
  }
  convertToArray() {
    if (this.nodeTree.root != undefined) {
      console.log("tree is empty")

      this.traversePreOrder(this.nodeTree.root);
    }

  }
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
