import { Component, OnInit } from '@angular/core';
import { Approach } from './Approach';
import { ApproachOne } from './ApproachOne';
import UtilityFunctions from 'src/app/shared/UtiltiyFunctions';
import { BreakpointObserver, LayoutModule, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sorted-squares',
  templateUrl: './sorted-squares.component.html',
  styleUrls: ['./sorted-squares.component.sass', '../coding-challenges.component.sass']
})
export class SortedSquaresComponent implements OnInit {

  isHandheld: boolean = false;
  approachStage1: Approach;
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
  pushZeroButton = false;


  // Starter datasets for each stage
  datasetStage1 = [-40, -10, -3, -1, 0, 2, 4, 7, 11, 30]
  datasetStage2 = [...this.datasetStage1];


  constructor(public breakpointObserver: BreakpointObserver) {
    this.approachStage1 = new ApproachOne(this.datasetStage1)
    // this.approachStage2 = new ApproachTwo(this.datasetStage2)
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
