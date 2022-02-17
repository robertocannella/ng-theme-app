import { Component, OnInit } from '@angular/core';
import { D3Service } from 'src/app/d3.service';
import { SvgService } from 'src/app/svg.service';

@Component({
  selector: 'app-sorted-squares',
  templateUrl: './sorted-squares.component.html',
  styleUrls: ['./sorted-squares.component.sass', '../coding-challenges.component.sass']
})
export class SortedSquaresComponent implements OnInit {

  constructor(private svg: SvgService) { }

  ngOnInit(): void {
    this.svg.rebuildSVG();
  }

}
