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
        cx: '20',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('end', style({
        cx: '60',
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

  @Input('node-tree') nodeTree?: CircleTree;
  @Input() circleNodeArray!: CircleNode[];
  @Input('traversed-pre-order') traversePreOrderArray!: CircleNode[];


}
