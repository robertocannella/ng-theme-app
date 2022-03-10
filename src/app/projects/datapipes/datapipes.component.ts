import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatapipesService } from 'src/app/datapipes.service';

@Component({
  selector: 'app-datapipes',
  templateUrl: './datapipes.component.html',
  styleUrls: ['./datapipes.component.sass', '../projects.component.sass']
})

export class DatapipesComponent implements OnInit {
  temperatureObject: any;
  constructor(public dps: DatapipesService) {
  }

  async ngOnInit() {
    this.dps.getObject().subscribe((p) => {
      this.temperatureObject = p
    });
  }



}
