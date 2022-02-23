import { Component, OnInit } from '@angular/core';
import { BasicArray } from '../BasicArray';
import { Approach } from '../duplicate-zeros/Approach';
import { SSApproachOne } from './SSApproachOne';
import { SSApproachTwo } from './SSApproachTwo';
import UtilityFunctions from 'src/app/shared/UtiltiyFunctions';
import { BreakpointObserver, LayoutModule, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sorted-squares',
  templateUrl: './sorted-squares.component.html',
  styleUrls: ['./sorted-squares.component.sass', '../coding-challenges.component.sass']
})
export class SortedSquaresComponent implements OnInit {

  isHandheld: boolean = false;
  approachStage1: BasicArray;
  approachStage2: BasicArray;
  //approachStage2: Approach;


  // Button Toggles/Contols
  _buttons = false;
  _buttonsStage2 = false;
  _buttonsStage1 = false;
  _topButtons = false;
  _resetButton = false;
  _statusButton = true;
  _statusButtonStage1 = true;

  isPlayingAnimation = 0;
  isPlayingRandomSeq = false;
  isPlaying: boolean = false;
  // For Displaying content in DOM 
  currentI = 0
  currentJ = 0
  currentIStage2 = 0
  currentJStage2 = 0
  totalZerosStage1 = 0
  totalZerosStage2 = 0
  status = 'Stop';
  statusStage1 = 'Stop';
  _controlsStage1 = false;
  // Avtivate these buttons:
  pushNegativeButton = true;
  pushZeroButton = true;


  // Starter datasets for each stage
  datasetStage1 = [-9, -7, -3, -1, 0, 2, 4, 7, 8, 9]
  datasetStage2 = [...this.datasetStage1];


  // APPROACH 2 is actually a cleaner version of APPROACH 1.  
  // Approach 1 from leetcode is actually to square each item, then sort them
  // TODO: implement Approach 1 with two different sorting algos. (selection and mergesort)
  constructor(public breakpointObserver: BreakpointObserver) {
    this.approachStage1 = new SSApproachOne(this.datasetStage1)
    this.approachStage2 = new SSApproachTwo(this.datasetStage2)
  }

  /// Angular Methods
  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe((state: BreakpointState) => {
      this.isHandheld = (state.matches)
    });
  }
  ngOnDestroy(): void {
    //this.approachStage1.stopAnimation();
    //this.approachStage2.stopAnimation();
    // unsubscribe from breakpoint subscription
  }

}
