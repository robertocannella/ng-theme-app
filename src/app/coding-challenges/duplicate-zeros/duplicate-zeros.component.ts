import { Component, OnDestroy, OnInit } from '@angular/core';
import UtilityFunctions from 'src/app/shared/UtiltiyFunctions';
import { BreakpointObserver, LayoutModule, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { ApproachTwo } from './ApproachTwo';
import { ApproachOne } from './ApproachOne';
import { Approach } from './Approach';
import { BasicArray } from '../BasicArray';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-duplicate-zeros',
  templateUrl: './duplicate-zeros.component.html',
  styleUrls: ['./duplicate-zeros.component.sass', '../coding-challenges.component.sass']
})
export class DuplicateZerosComponent implements OnInit, OnDestroy {

  isHandheld: boolean = false;
  approachStage1: Approach;
  approachStage2: Approach;


  // Button Toggles/Contols
  _buttons = false;
  _buttonsStage2 = false;
  _buttonsStage1 = false;
  _topButtons = false;
  _resetButton = false;
  _statusButton = true;
  _statusButtonStage1 = true;
  // Avtivate these buttons:
  pushNegativeButton = false;
  pushZeroButton = true;

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


  // Starter datasets for each stage
  datasetStage1 = [4, 3, 3, 7, 0, 3, 0, 3]
  datasetStage2 = [...this.datasetStage1];


  constructor(public breakpointObserver: BreakpointObserver) {
    this.approachStage1 = new ApproachOne(this.datasetStage1)
    this.approachStage2 = new ApproachTwo(this.datasetStage2)
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
    this.approachStage1.stopAnimation();
    this.approachStage2.stopAnimation();
    // unsubscribe from breakpoint subscription
  }

  async compareAll() {
    this.approachStage1.isPlayingAnimation = true;
    this.approachStage2.isPlayingAnimation = true;
    this.approachStage1.statusButtonDisabled = true;
    this.approachStage2.statusButtonDisabled = true;
    this.approachStage1.buttonsDisabled = true;
    this.approachStage2.buttonsDisabled = true;
    this.approachStage1.status = 'Comparing...';
    this.approachStage2.status = 'Comparing...';
    this._topButtons = true
    return new Promise(async (resolve) => {

      this.status = 'Comparing...'
      this.isPlayingRandomSeq = true
      this._buttons = true
      this.approachStage2.dataset = [...this.approachStage1.dataset]
      this.approachStage1.update();
      this.approachStage2.update();
      //this.updateStage1();
      await Promise.all([
        this.approachStage1.animate(),
        this.approachStage2.animate()
      ])//.catch(e => this.resetAll());

      setTimeout(() => {
        resolve([
          this.approachStage1.resolveAnimate(),
          this.approachStage2.resolveAnimate(),
          this.resolveAnimate()
        ])
      }, 200)
    })
  }
  async randomAll(sizeEach: number = UtilityFunctions.getRandomInt(9, 9)) {

    this._topButtons = true
    this._statusButton = false;
    this.status = 'Stop';
    return new Promise(async (resolve) => {

      this.isPlayingRandomSeq = true
      this.isPlaying = true;
      this.isPlayingAnimation = 0

      this._buttons = true

      while (this.isPlaying) {
        this.approachStage1.status = 'Comparing...';
        this.approachStage2.status = 'Comparing...';
        this.approachStage1.isPlayingAnimation = true;
        this.approachStage2.isPlayingAnimation = true;
        this.approachStage1.statusButtonDisabled = true;
        this.approachStage2.statusButtonDisabled = true;
        this.approachStage1.buttonsDisabled = true;
        this.approachStage2.buttonsDisabled = true;
        this.approachStage1.dataset = []

        for (let j = 0; j < sizeEach; j++) {
          this.approachStage1.dataset.push(UtilityFunctions.getRandomInt(0, 9))
        }
        if (!this.approachStage1.dataset.includes(0))
          continue;
        this.approachStage2.dataset = [...this.approachStage1.dataset]

        this.approachStage1.update();
        this.approachStage2.update();

        await Promise.all([
          this.approachStage1.animate(true),
          this.approachStage2.animate(true)
        ])//.catch(() => { this.resetAll() })
      }
      setTimeout(() => {
        resolve(this.resolvePlayRandom())
      }, 200)
    })
  }
  resolvePlayRandom() {
    this.status = 'Finished';
    this._topButtons = false;
    this.approachStage1.buttonsDisabled = false;
    this.approachStage2.buttonsDisabled = false;
    this.isPlayingRandomSeq = false;

  }
  resolveAnimate() {
    this._topButtons = false;
    this.status = 'Finished';
  }
  stopAll() {
    this._statusButton = true;
    this.status = 'Ending...'
    this.isPlaying = false;
  }
  setIsPlaying(event: any) {
    this.isPlayingAnimation += event;
  }
  resetStages() {
    this.isPlayingRandomSeq = false
    this.isPlayingAnimation = 0
    this.approachStage1.update();
    this.approachStage2.update();
    this.approachStage1.reset();
    this.approachStage2.reset();
  }


}
