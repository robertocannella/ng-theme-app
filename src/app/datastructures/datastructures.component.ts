import { Component } from '@angular/core';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { CircleNode, CircleTree } from './CircleTree';

interface SVGElement extends Element {
  beginElement(): SVGElement;
}

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
  initialNodeValue: number = 22;
  balanceFactor: number = 0;
  panelOpenState = false;

  clearNodes() {
    this.traversePreOrderArray = [];
    this.circleNodeArray = [];
    this.nodeTree.root = null;
  }

  addCircleNode(value: string) {

    let valueAsInt = parseInt(value)
    if (this.nodeExists(valueAsInt) || this.circleNodeArray.length > 6)
      return;

    this.initialNodeValue = this.getNextValue();


    this.traversePreOrderArray = [];
    this.nodeTree.root = this.nodeTree.addNode(valueAsInt);
    this.circleNodeArray.push(new CircleNode(valueAsInt));

    console.log("Initial Input Array");
    console.log(this.circleNodeArray);

    this.traversePreOrderArray =
      this.nodeTree.traversePreOrder(this.nodeTree.root, this.traversePreOrderArray);
    console.log("Traversed Array");
    console.log(this.traversePreOrderArray);

    console.log("Tree");
    console.log(this.nodeTree);

    this.balanceFactor = this.nodeTree.balanceFactor(this.nodeTree.root);;
  }
  private nodeExists(i: number): boolean {
    var exists = false;
    var x = this.circleNodeArray.forEach(
      (e) => {
        if (e.value == i)
          exists = true;
      });
    return exists;
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
  private getNextValue(): number {
    var newValue = Math.floor(Math.random() * 99) + 1;
    while (newValue == this.initialNodeValue) {
      newValue = Math.floor(Math.random() * 99) + 1;
      console.log("Duplicate Node Value")
    }
    return newValue;
  }
}
