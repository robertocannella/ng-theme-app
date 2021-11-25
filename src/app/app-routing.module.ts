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


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
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
