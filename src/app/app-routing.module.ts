import { ProjectsComponent } from './projects/projects.component';
import { JournalComponent } from './journal/journal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgorithmsComponent } from './algorithms/algorithms.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DatastructuresComponent } from './datastructures/datastructures.component';
import { MachineLearningComponent } from './machine-learning/machine-learning.component';
import { DataScienceComponent } from './data-science/data-science.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ToolsComponent } from './tools/tools.component';
import { MathComponent } from './math/math.component';
import { DuplicateZerosComponent } from './coding-challenges/duplicate-zeros/duplicate-zeros.component';
import { CodingChallengesComponent } from './coding-challenges/coding-challenges.component';
import { SortedSquaresComponent } from './coding-challenges/sorted-squares/sorted-squares.component';
import { MaxConsecutiveOnesComponent } from './coding-challenges/max-consecutive-ones/max-consecutive-ones.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent // HAS CHILDREN
  },
  {
    path: 'coding-challenges',
    component: CodingChallengesComponent,
    children: [
      {
        path: '',
        component: DuplicateZerosComponent // DEFAULT
      },
      {
        path: 'duplicate-zeros',
        component: DuplicateZerosComponent
      },
      {
        path: 'sorted-squares',
        component: SortedSquaresComponent
      },
      {
        path: 'max-consecutive-ones',
        component: MaxConsecutiveOnesComponent
      }
    ]
  },
  {
    path: 'math',
    component: MathComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {
    path: 'tools',
    component: ToolsComponent
  },
  {
    path: 'datastructures',
    component: DatastructuresComponent
  },
  {
    path: 'machine-learning',
    component: MachineLearningComponent
  },
  {
    path: 'data-science',
    component: DataScienceComponent
  },
  {
    path: 'journal',
    component: JournalComponent
  },
  {
    path: 'algorithms',
    component: AlgorithmsComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
