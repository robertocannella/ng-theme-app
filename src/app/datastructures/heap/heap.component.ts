import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SummariesService } from './../../summaries.service';

export interface Summary { citation: string; summary: string; wikiLink: string }

@Component({
  selector: 'app-heap',
  templateUrl: './heap.component.html',
  styleUrls: ['./heap.component.sass', '../datastructures.component.sass']

})
export class HeapComponent implements OnInit, OnDestroy {
  summary: Observable<Summary>;
  title = 'Heaps'

  constructor(private summaryService: SummariesService) {
    this.summary = this.summaryService.get();

    console.log(this.summary)

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }


}
