import { ProjectsComponent } from './projects/projects.component';
import { JournalComponent } from './journal/journal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
      {
        path: 'journal',
        component: JournalComponent
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
