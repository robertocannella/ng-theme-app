import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coding-challenges',
  templateUrl: './coding-challenges.component.html',
  styleUrls: ['./coding-challenges.component.sass']
})
export class CodingChallengesComponent implements OnInit {
  currentTab = "Tab1";
  constructor() { }

  ngOnInit(): void {
  }

}
