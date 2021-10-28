import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { CircleNode, CircleTree } from '../datastructures/CircleTree';

@Component({
  selector: 'graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.sass']
})
export class GraphicComponent {

  constructor() { }
  @Input('node-tree') nodeTree?: CircleTree;
  @Input() circleNodeArray!: CircleNode[];
  @Input('traversed-pre-order') traversePreOrderArray!: CircleNode[];



}
