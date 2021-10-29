import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { CircleNode, CircleTree } from '../datastructures/CircleTree';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.sass'],
  animations: [
    trigger('moveNode', [
      // ...
      state('start', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('end', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('start => end', [
        animate('1s')
      ]),
      transition('end => start', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class GraphicComponent {

  constructor() { }
  @Input('node-tree') nodeTree?: CircleTree;
  @Input() circleNodeArray!: CircleNode[];
  @Input('traversed-pre-order') traversePreOrderArray!: CircleNode[];
  isLoaded = this?.loaded();

  loaded(): boolean {

    return this.circleNodeArray?.length > 0;
  }

}
