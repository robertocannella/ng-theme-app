import { environment } from "src/environments/environment";
import { AngularFireModule } from '@angular/fire/compat';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { JournalComponent } from './journal/journal.component';
import { ProjectsComponent } from './projects/projects.component';
import { TopicsComponent } from './journal/topics/topics.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { NewPostFormComponent } from './new-post-form/new-post-form.component';
import { AlgorithmsComponent } from './algorithms/algorithms.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DatastructuresComponent } from './datastructures/datastructures.component';
import { GraphicComponent } from './graphic/graphic.component';
import { MachineLearningComponent } from './machine-learning/machine-learning.component';
import { DataScienceComponent } from './data-science/data-science.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    ProjectsComponent,
    TopicsComponent,
    NewEntryComponent,
    NewPostFormComponent,
    AlgorithmsComponent,
    WelcomeComponent,
    DatastructuresComponent,
    GraphicComponent,
    MachineLearningComponent,
    DataScienceComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
